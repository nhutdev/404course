<template>
    <main class=" py-2 px-4" v-for="blog in blogs">
        <div class="mb-4 md:mb-0 w-full max-w-screen-md mx-auto relative" style="height: 24em;">
            <div class="absolute left-0 bottom-0 w-full h-full z-10"
                style="background-image: linear-gradient(180deg,transparent,rgba(0,0,0,.7));"></div>
            <img :src="blog.img_blog" class="absolute left-0 top-0 w-full h-full z-0 object-cover" />
            <div class="p-4 absolute bottom-0 left-0 z-20">
                <a href="#" class="px-4 py-1 bg-black text-gray-200 inline-flex items-center justify-center mb-2">{{
                    blog.tag.nametag }}</a>
                <h2 class="text-4xl font-semibold text-gray-100 leading-tight">
                    {{ blog.title_blog }}
                </h2>
                <div class="flex mt-3">
                    <img :src="blog.user.avatar" 
                        class="h-10 w-10 rounded-full mr-2 object-cover" />
                    <div>
                        <p class="font-semibold text-gray-200 text-sm"> {{ blog.user.fullname }} </p>
                        <p class="font-semibold text-gray-400 text-xs"> {{ formatDate(blog.createdAt) }} </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="px-4 lg:px-0 mt-12 text-gray-700 max-w-screen-md mx-auto text-lg leading-relaxed">

            <div v-html='blog.content_blog'>
            </div>
            <!-- Footer action  -->
            <div class="px-4 py-2 bg-white">
                <div class="flex items-center mb-2">
                    <!--like handle-->
                    <div class="action mr-3">
                        <!-- Sử dụng v-if để kiểm tra xem sản phẩm có trong danh sách thích hay không -->
                        <i class="fa fa-heart"></i>
                        <!-- Nếu không có sản phẩm nào trong danh sách thích, hiển thị chữ màu #ccc -->
                        <!-- {{ resultLike(post.id) }} -->
                    </div>
                    <!--post comment-->
                    <button>
                        <span><i class="uil uil-share" @click="share(post)"></i></span>
                    </button>

                    <div class="ml-auto" :class="checkUser(blog.user.id)">
                        <i class="fa-solid fa-bookmark text-xl"></i>
                    </div>
                </div>


                <div class="text-gray-900 text-sm font-bold mb-2 cursor-pointer" @click="openComment">Xem tất cả
                    bình
                    luận</div>

                <!--post comment-->
                <div class="flex items-center mt-2">
                    <img class="w-6 h-6 rounded-full mr-2" :src="user.avatar" alt="Avatar">
                    <textarea class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none text-sm"
                        type="text" v-model="comments" placeholder="Thêm bình luận..." ></textarea>
                </div>

            </div>
        </div>
    </main>

    <!--view comment-->
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto"
        v-show="showComment">

        <div class="relative w-full max-w-2xl max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        Giao diện bình luận
                    </h3>
                    <button type="button"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                        @click="openComment">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>

                    </button>
                </div>
                <!-- Modal body -->
                <div class="p-6 space-y-6">
                   

            </div>
            <!-- Modal footer -->
            <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button data-modal-hide="staticModal" type="button"
                    class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 "
                    @click="showComment">Hủy</button>
            </div>
        </div>
    </div>
</div></template>

<script>
import dayjs from 'dayjs';
import userServices from '../../plugins/userServices';
export default {

    data() {
        return {
            blogs: [],
            user: '',
            showComment: false
        }
    },
    mounted() {
        this.getBlog()
        this.user = userServices.getUserToken()
    },
    methods: {
        async getBlog() {
            try {
                const result = await this.$axios.get(`blog/get/${this.$route.params.id}`)
                this.blogs = result.data
            } catch (error) {
                console.log(error)
            }
        },
        formatDate(time) {
            return dayjs(time).format('DD-MM-YYYY');
        },
        checkUser(id) {
            return id !== this.user.id ? '' : 'hidden';
        },
        openComment() {
            this.showComment = !this.showComment
        }

    }

}

</script>