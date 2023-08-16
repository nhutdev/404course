<template>
    <!--blog view-->
    <!--add-->
    <div class=" mt-5 editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl"
        v-if="showAdd">
        <div>
            <label class="block mb-2 text-sm font-medium text-gray-900 ">Chọn thể loại</label>
            <select id="select" name="select" v-model="id_tag"
                class="block appearance-none w-full bg-white border px-4 py-2 pr-8 mb-2 leading-tight focus:outline-none">
                <option v-for="tag in tags" :key="tag.id" :value="tag.id">{{ tag.nametag }}
                </option>
            </select>
        </div>
        <input class="title border border-gray-300 p-2 mb-4 outline-none" spellcheck="false" v-model="title"
            placeholder="Tiêu đề blog" type="text">
        <QuillEditor v-model="content" />
        <p>{{ content }}</p>
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
        <div class="mx-auto container">
            <div aria-label="Group of cards" class="focus:outline-none ">
                <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
                    <div class="focus:outline-none " aria-label="card 2">
                        <img role="img" aria-label="gaming" class="focus:outline-none w-full"
                            src="https://cdn.tuk.dev/assets/components/111220/Blg-6/blog(2).png" alt="games" />
                        <div class="py-2 px-4 w-full flex justify-between bg-indigo-700">
                            <p class="focus:outline-none  text-sm text-white font-semibold tracking-wide">Bruce Wayne</p>
                            <p class="focus:outline-none text-sm text-white font-semibold tracking-wide">13TH Oct, 2020</p>
                        </div>
                        <div class="bg-white dark:bg-gray-800 px-3 lg:px-6 py-4 rounded-bl-3xl rounded-br-3xl">
                            <h1
                                class="focus:outline-none text-lg text-gray-900 dark:text-white font-semibold tracking-wider">
                                Transactions</h1>
                            <p
                                class="focus:outline-none text-gray-700 dark:text-gray-200 text-sm lg:text-base lg:leading-8 pr-4 tracking-wide mt-2">
                                Find the latest events updates or create events, concerts, conferences, workshops...</p>
                        </div>
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
            id_tag: ''}
           
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
        clearText() {
            this.title = ''
            this.content = ''
        },
        async getblog() {
            try {
                const result = await this.$axios.get(`blog/get?page=${this.query}&&status=1`);
                this.blogs = result.data.blog
            } catch (error) {
                console.log(error)
            }
        },
        updateContent(newContent) {
            this.content = newContent;
        },
        async addBlog() {
            alert(this.content)
            // try {
            //     const result = await this.$axios.post(`blog/add`,
            //         {
            //             title_blog: this.title, content_blog: this.content, id_user: this.user.id, id_tag: this.id_tag
            //         });
            //     if (result.status == 200) {
            //         this.$refs.toast.showToast(result.data.message)
            //         this.getblog()
            //         this.clearText()
            //         this.showAdd = false
            //     }
            //     else {
            //         this.$refs.toast.showToast(result.data.message)
            //     }
            // } catch (error) {
            //     console.log(error)
            // }
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