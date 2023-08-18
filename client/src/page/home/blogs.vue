<template>
    <!--blog view-->
    <!--add-->
    <div class=" mt-5 editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl"
        v-if="showAdd">
        <div>
            <label class="block mb-2 text-sm font-medium text-gray-900 ">Chọn thể loại</label>
            <select id="select" name="select" v-model="id_tag"
                class="block appearance-none w-full bg-white border px-4 py-2 pr-8 mb-2 leading-tight focus:outline-none">
                <option v-for="tag in tags.filter(items => items.status == 1)" :key="tag.id" :value="tag.id"> {{ tag.nametag
                }}
                </option>
            </select>
        </div>
        <input class="title border border-gray-300 p-2 mb-4 outline-none" spellcheck="false" v-model="title"
            placeholder="Tiêu đề blog" type="text">
        <input class="title border border-gray-300 p-2 mb-4 outline-none" spellcheck="false" v-model="img_blog"
            placeholder="Đường dẫn ảnh" type="text">
        <QuillEditor theme="snow" ref="myEditor" />
        <!-- buttons -->
        <div class="buttons flex mt-2">
            <div class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer mr-4"
                @click="addBlog()">
                Thêm</div>
            <div class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer mr-4"
                @click="openAdd()">
                Hủy</div>
        </div>
    </div>

    <!--view-->
    <div id="blog" class=" px-4 xl:px-4 py-14">
        <button @click="openAdd()" v-if="!showAdd" type="button"
            class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 ">Thêm</button>
        <div class="container mx-auto px-6 md:px-0">
            <div class=" grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-8 ">
                <!-- chi tiet -->
                <div v-for="blog in blogs"
                    class="relative w-full h-64 bg-cover bg-center group rounded-lg overflow-hidden shadow-lg hover:shadow-3xl  transition duration-300 ease-in-out "
                    v-bind:style="{ 'background-image': 'url(' + blog.img_blog + ')' }">

                    <div class=" w-full flex justify-between px-4 py-2  ">
                        <p tabindex="0" class="focus:outline-none text-sm text-white font-semibold tracking-wide">{{
                            blog.user.fullname }}</p>
                        <p tabindex="0" class="focus:outline-none text-sm text-white font-semibold tracking-wide">{{
                            formatDate(blog.createdAt) }}</p>
                    </div>

                    <div
                        class="absolute inset-0 bg-black bg-opacity-50 group-hover:opacity-75 transition duration-300 ease-in-out">
                    </div>
                    <div class="relative w-full h-full flex flex-col justify-center items-center">
                        <h3 class="text-center">
                            <a class="text-white text-sm md:text-base font-bold text-center">
                                {{ blog.title_blog }}
                            </a>
                        </h3>
                        <div class="flex">
                            <button type="button" @click="openUpdate(), sendData(blog)" v-if="user.id == blog.user.id"
                                class=" mr-2 cursor-pointer py-2.5 px-5 my-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 hidden group-hover:block">Chỉnh
                                sửa</button>
                            <button type="button" v-if="user.id == blog.user.id" @click="deleteBlog(blog.id)"
                                class=" cursor-pointer py-2.5 px-5 my-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 hidden group-hover:block">Xóa
                                bài</button>
                        </div>
                        <button type="button"
                            class=" cursor-pointer py-2.5 px-5 my-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 hidden group-hover:block"
                            @click="goToBlog(blog.id)">Xem
                            bài</button>

                    </div>
                </div>

            </div>
        </div>
    </div>


    <!-- Chinh sua -->
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto"
        v-show="showUpdate">

        <div class="relative w-full max-w-2xl max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        Cập nhập bài đăng
                    </h3>
                    <button type="button"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                        @click="openUpdate">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>

                    </button>
                </div>
                <!-- Modal body -->
                <div class="p-6 space-y-6">
                    <label class="block mb-2 text-sm font-medium text-gray-900 ">Chọn thể loại</label>
                    <select id="select" name="select" v-model="id_tag"
                        class="block appearance-none w-full bg-white border px-4 py-2 pr-8 mb-2 leading-tight focus:outline-none">
                        <option v-for="tag in tags.filter(items => items.status == 1)" :key="tag.id" :value="tag.id"> {{
                            tag.nametag
                        }}
                        </option>
                    </select>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 ">Tiêu đề</label>
                        <input type="text"
                            class="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none "
                            v-model="title" required>
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 ">Đường dẫn ảnh</label>
                        <input type="text"
                            class="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none "
                            v-model="img_blog" required>
                        <img :src="img_blog" alt="">
                    </div>

                    <QuillEditor theme="snow" ref="myEditorUpdate" />
                </div>
                <!-- Modal footer -->
                <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button data-modal-hide="staticModal" type="button"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                        @click="updateBlog">Cập
                        nhập</button>
                    <button data-modal-hide="staticModal" type="button"
                        class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 "
                        @click="showUpdate">Hủy</button>
                </div>
            </div>
        </div>
    </div>

    <toast ref="toast"></toast>
</template>


<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import userServices from '../../plugins/userServices';
import functionService from '../../plugins/functionService';
import blogService from '../../plugins/blogService'
import toast from '../../components/toast/toast.vue';
import dayjs from 'dayjs';
export default {

    data() {
        return {
            showAdd: false, showUpdate: false,
            title: '', content: '', query: 1,
            blogs: [], tags: [], imgs: [], status: 0,
            user: '', id_tag: '', img_blog: '', blog: '', id: ''
        }
    },
    components: {
        QuillEditor, toast
    },
    mounted() {
        this.getblog()
        this.gettag()
        this.user = userServices.getUserToken()
    },
    methods: {
        openAdd() {
            this.showAdd = !this.showAdd
        },
        formatDate(time) {
        return dayjs(time).format('DD-MM-YYYY');
    },
        clearText() {
            this.title = ''
            this.content = ''
            this.img_blog = ''
        },

        async getblog() {
            blogService.getblog(this.query, this.status).then((data) => { this.blogs = data.blogs })
        },
        updateContent(newContent) {
            this.content = newContent;
        },
        async addBlog() {
            const result = await blogService.addBlog(this.title, this.$refs.myEditor.getHTML(), this.user.id, this.id_tag, this.img_blog)
            if (result.status == 200) {
                this.$refs.toast.showToast(result.data.message)
                this.getblog()
                this.clearText()
                this.showAdd = false
            }
            else {
                this.$refs.toast.showToast(result.data.message)
            }
        },
        async deleteBlog(id) {
            const result = await blogService.deleteBlog(id)
            if (result.status == 200) {
                this.$refs.toast.showToast(result.data.message)
                this.getblog()
            }
            else {
                this.$refs.toast.showToast(result.data.message)
            }
        },
        async gettag() {
            try {
                const result = await this.$axios.get(
                    `tag/get`
                );
                this.tags = result.data;
            } catch (e) {
                console.log(e);
            }
        },
        goToBlog(id) {
            window.location.href = `${import.meta.env.VITE_API_BASE_FE}/home/blogs/detail/${id}`;
        },
        sendData(blog) {
            this.blog = blog
            this.img_blog = blog.img_blog
            this.title = blog.title_blog
            this.$refs.myEditorUpdate.setHTML(blog.content_blog)
            this.id = blog.id
            this.id_tag = blog.tag.id
        },
        openUpdate() {
            this.showUpdate = !this.showUpdate
        },
        async updateBlog() {
            const result = await blogService.updateBlog(this.title, this.$refs.myEditorUpdate.getHTML(), this.user.id, this.id_tag, this.img_blog, this.id)
            if (result.status == 200) {
                this.$refs.toast.showToast(result.data.message)
                this.getblog()
                this.clearText()
                this.showUpdate = false
            }
            else {
                this.$refs.toast.showToast(result.data.message)
            }
        }
    }

}

</script>