<template>
    <div class="flex m-2 ">
        <div class="w-1/4 shadow-lg shadow-gray-500/50 p-2 ">
            <div class="flex flex-col" v-for="index in courses.index_courses">
                <a href="#" class="p-4 border border-gray-300 hover:bg-gray-100 mb-2">{{ index.title_index }}</a>
                <div id="subTabs1" class="pl-4 flex flex-col" v-for="content in index.content_index_courses">
                    <a href="#" class="p-4 hover:bg-gray-100" @click="showContent(content)">{{ content.title_content }}</a>
                </div>
            </div>
        </div>
        <div class="w-3/4 p-4">
            <!-- Nội dung của tab sẽ được đặt ở đây -->
            <div class="flex " v-if="showCourse">
                <!-- Card -->
                <div class="bg-white p-8">
                    <!-- Header -->
                    <header class="flex font-light text-base">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 rotate-90 -ml-2" viewBox="0 0 24 24"
                            stroke="#b91c1c">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                        </svg>
                        <p >{{ fullname}}</p>
                    </header>

                    <!-- Title -->
                    <h2 class="font-bold text-3xl mt-2">
                        {{ courses.title_course }}
                    </h2>

                    <!-- Description -->
                    <h3 class="font-bold text-xl mt-8"> Miêu tả</h3>
                    <p class="font-light"> {{ courses.description_course }} </p>
                </div>

            </div>
            <!--Nội dung chi tiết-->
            <div v-if="content.type == 'video'">
                <iframe class="w-full  aspect-video aspect-[4/3] " :src="content.link_video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
            <div v-else>
                <p v-html="content.description_content"></p>
            </div>
        </div>
    </div>
    <footerV/>
</template>
<script>
import courseService from '../../plugins/courseService';
import footerV from '../../components/footer.vue';
export default {

    data() {
        return {
            courses: [],
            content: '',fullname:'',
            showCourse:true
        }
    },
    components: {footerV},
    mounted() {
        courseService.getCourseByID(this.$route.params.id).then((data) => { this.courses = data
        this.fullname = data.user.fullname })

    },
    methods: {
        showContent(content) {
            this.showCourse = false
            this.content = content
        }
    }

}

</script>