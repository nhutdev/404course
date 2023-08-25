<template>
    <body class="bg-white">
        <main class="container mx-auto px-6 md:px-0">
            <section>
                <h1 class="text-3xl font-bold text-gray-600 mb-10">Danh sách khóa học</h1>
                <!--khóa học-->
                <div class="mt-2 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-x-6 gap-y-8 ">
                    <!-- chi tiet -->
                    <div  v-for="course in courses">
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
                            <button type="button" @click="gotoCourse(course.id)"
                                class=" cursor-pointer py-2.5 px-5 my-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 hidden group-hover:block">Xem khóa học</button>
                        </div>
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
        </main>
        
    </body>
</template>

<script>
import userService from '../plugins/userServices';
import courseService from '../plugins/courseService';
export default {
    data() {
        return {
            user: '',
            courses: [],
            page: 1,
            status:1,
            id_course:''
        }
    },
    components: {  },
    mounted() {
        this.user = userService.getUserToken()
        courseService.getCourse(this.page, this.status).then((data) => { this.courses = data.courses});
    },
    methods: {
        gotoCourse(id)
        {
        window.location.href = `${import.meta.env.VITE_API_BASE_FE}/home/course_detail/${id}`;

        }
    }
}

</script>