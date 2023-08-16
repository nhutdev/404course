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
                            <a class="text-white text-2xl font-bold text-center">
                                {{ blog.title_blog }}
                            </a>
                        </h3>
                        <button type="button" @click="openEdit(), sendData(blog)" v-if="user.id == blog.user.id"
                            class=" cursor-pointer py-2.5 px-5 my-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 hidden group-hover:block">Chỉnh
                            sửa</button>
                        <button type="button"
                            class=" cursor-pointer py-2.5 px-5 my-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 hidden group-hover:block">Xem
                            bài</button>
                    </div>


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
import toast from '../../components/toast/toast.vue';
import dayjs from 'dayjs';

export default {

    data() {
        return {
            showAdd: false,
            title: '',
            content: '',
            query: 1,
            blogs: [],
            user: '',
            tags: [],
            id_tag: '',
            imgs: [],
            img_blog: ''
        }

    },
    components: {
        QuillEditor, toast
    },
    mounted() {
        this.getblog()
        this.gettag()
        this.getImages()
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
        async getImages() {
            userServices.getImages().then((data => { this.imgs = data }))
        },
        async getblog() {
            try {
                const result = await this.$axios.get(`blog/get?page=${this.query}&&status=0`);
                this.blogs = result.data.blogs
            } catch (error) {
                console.log(error)
            }
        },
        updateContent(newContent) {
            this.content = newContent;
        },
        async addBlog() {

            try {
                const result = await this.$axios.post(`blog/add`,
                    {
                        title_blog: this.title, content_blog: this.$refs.myEditor.getHTML(), id_user: this.user.id, id_tag: this.id_tag, img_blog: this.img_blog
                    });
                if (result.status == 200) {
                    this.$refs.toast.showToast(result.data.message)
                    this.getblog()
                    this.clearText()
                    this.showAdd = false
                }
                else {
                    this.$refs.toast.showToast(result.data.message)
                }
            } catch (error) {
                console.log(error)
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
    }

}

</script>