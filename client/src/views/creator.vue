<template>
    <body class="bg-white">
        <header>
            <nav class="p-6">
                <div class="flex justify-between items-center">
                    <h1 class="pr-6 border-r-2 text-2xl font-bold text-gray-500">404Learn</h1>
                    <div class="flex justify-between flex-grow">
                        <div class="flex ml-6 items-center">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-4 cursor-pointer text-gray-500"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </span>
                            <input class="outline-none text-sm flex-grow bg-gray-100" type="text"
                                placeholder="Tìm kiếm khóa học" />
                        </div>
                        <div class="md:flex space-x-6 hidden">
                            <span class="cursor-pointer px-4 py-2 bg-violet-500 rounded" @click="Showcreate()">+ Thêm khóa
                                học</span>
                        </div>
                    </div>
                </div>
            </nav>

            <!-- Section Hero -->
            <div
                class="container mx-auto bg-gradient-to-r from-violet-500 to-fuchsia-500 h-96 rounded-md flex items-center">
                <div class="sm:ml-20 text-gray-50 text-center sm:text-left">
                    <h1 class="text-5xl font-bold mb-4">
                        404Learn <br />
                        Chia sẽ mọi thứ.
                    </h1>
                    <p class="text-lg inline-block sm:block">Trang quản lý khóa học của nhà sáng tạo.</p>
                    <button class="mt-8 px-4 py-2 bg-fuchsia-500 rounded">Tận tâm vì công việc</button>
                </div>
            </div>

        </header>

        <main class="py-16 container mx-auto px-6 md:px-0">
            <section>
                <h1 class="text-3xl font-bold text-gray-600 mb-10">Danh sách khóa học</h1>
                <!--khóa học-->
                <div class="mt-6 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-8 " v-for="course in courses">
                    <!-- chi tiet -->
                    <div class="relative w-full h-64 bg-cover bg-center group rounded-lg overflow-hidden shadow-lg hover:shadow-3xl  transition duration-300 ease-in-out "
                        v-bind:style="{ 'background-image': 'url(' + course.img_course + ')' }">
                        <div
                            class="absolute inset-0 bg-black bg-opacity-50 group-hover:opacity-75 transition duration-300 ease-in-out">
                        </div>
                        <div class="relative w-full h-full flex flex-col justify-center items-center">
                            <h3 class="text-center">
                                <a class="text-white text-2xl font-bold text-center">
                                    {{ course.title_course }}
                                </a>
                            </h3>
                            <button type="button" @click="openEdit(), sendData(course)"
                                class=" cursor-pointer py-2.5 px-5 my-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 hidden group-hover:block">Chỉnh
                                sửa</button>
                        </div>
                    </div>
                </div>

                <!--chi muc-->
                <div class="grid sm:grid-cols-3 gap-4 grid-cols-2  mb-10 mt-10">
                    <nav aria-label="Page navigation ">
                        <ul class="inline-flex -space-x-px">
                            <li>
                                <a
                                    class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">&lt&lt</a>
                            </li>
                            <li>
                                <a href="#"
                                    class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                            </li>
                            <li>
                                <a
                                    class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">&gt&gt</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </section>

            <!--edit course-->
            <div class=" fixed w-full h-full top-0 left-0 flex items-center justify-center z-50 " v-show="ShowEdit">
                <div class="absolute w-full h-full bg-gray-900 opacity-50" @click="openEdit"></div>

                <div class=" bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto ">
                    <div class="flex flex-row py-3 px-4">
                        <h5 class="text-lg font-semibold flex-grow">Cập nhập khóa học</h5>
                        <i class="uil-multiply flex-none cursor-pointer bg-gray-400 rounded-xl" @click="openEdit"></i>
                    </div>
                    <div class="px-4">
                        <div v-for="(index, i) in getcourse.index_courses">
                            <div class="flex w-full h-10 bg-white rounded-md justify-between shadow-lg shadow-grey-500/50 border-solid border-2"
                                @click="ShowIndex()">
                                <div class="p-2 flex items-center">
                                    <i class="fa-solid fa-plus font-bold text-base mr-2" v-if="isShowIndex"></i>
                                    <i class="fa-solid fa-minus" v-if="!isShowIndex"></i>
                                    <h3 class="font-bold text-base ml-2" v-if="isShowIndex"> {{ i + 1 + '.' + ' ' +
                                        index.title_index }}</h3>
                                </div>
                                <div class="p-2">
                                    <h3 class="font-bold text-base">{{ sumcontent(index.content_index_courses) }} bài học</h3>
                                </div>

                            </div>
                            <!--lisst content index-->
                            <ol class=" flex items-center p-5" v-if="!isShowIndex" v-for="(content,i) in index.content_index_courses" >
                                <li>{{i + 1 + '.' + ' '+ content.title_content }}</li>
                                <li v-if="content.type == 'document'">{{  content.description_content }}</li> 
                                <li v-if="content.type == 'video'"><iframe id="youtubeFrame" src="https://www.youtube.com/embed/y881t8ilMyc" frameborder="0" allowfullscreen></iframe>
 </li> 
                            </ol>
                        </div>
                    </div>
                    <div class="py-3 px-4">

                        <button
                            class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer"
                            @click="openEdit()">Đóng</button>
                    </div>
                </div>
            </div>

        </main>
    </body>
    <createCourse v-if="is_showcreate" @cancel="Showcreate()" />
</template>

<script>
import userService from '../plugins/userService';
import createCourse from '../page/creator/createCourses.vue';
import courseService from '../plugins/courseService';
export default {
    data() {
        return {
            is_showcreate: false,
            user: '',
            courses: [],
            page: 1,
            status: 0,
            isShowIndex: true,
            getcourse: '',
            ShowEdit: false
        }
    },
    components: { createCourse },
    mounted() {
        this.user = userService.getUserToken()
        courseService.getCourse(this.page, this.status).then((data) => { this.courses = data.courses.filter(item => item.status == this.status) });
        console.log(this.courses)
        if (this.user.role != 'Creator') {
            this.$router.push({ name: 'login' });
        }
    },
    methods: {
        Showcreate() {
            this.is_showcreate = !this.is_showcreate
        },
        ShowIndex() {
            this.isShowIndex = !this.isShowIndex
        },
        openEdit() {
            this.ShowEdit = !this.ShowEdit
        }, sendData(course) {
            this.getcourse = course
        },
        sumcontent(content) {
            let sum = 0;
            for (let i = 0; i < content.length; i++) {
                    sum++;
            }
            return sum;
        },
        
    }
}

</script>