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
                    <img src="https://randomuser.me/api/portraits/men/97.jpg"
                        class="h-10 w-10 rounded-full mr-2 object-cover" />
                    <div>
                        <p class="font-semibold text-gray-200 text-sm"> {{ blog.user.fullname }} </p>
                        <p class="font-semibold text-gray-400 text-xs"> {{ formatDate(blog.createdAt) }} </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="px-4 lg:px-0 mt-12 text-gray-700 max-w-screen-md mx-auto text-lg leading-relaxed">
            <p :v-html="blog.content_blog"></p>
            <div v-html='blog.content_blog'>
</div>
        </div>
    </main>
</template>
<script>
import dayjs from 'dayjs';

export default {

    data() {
        return {
            blogs: []
        }
    },
    mounted() {
        this.getBlog()
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
        extractHTMLContent(htmlString) {
  const temporaryElement = document.createElement("div");
  temporaryElement.innerHTML = htmlString;
  return temporaryElement.textContent || temporaryElement.innerText;
}
    }

}

</script>