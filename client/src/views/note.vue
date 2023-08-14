<template>
    <div class="mx-auto container py-20 px-6">
        <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
            <div class="rounded" v-for="note in notes">
                <div
                    class="w-full h-64 flex flex-col justify-between dark:bg-gray-800 bg-white dark:border-gray-700 rounded-lg border border-gray-400 mb-6 py-5 px-4">
                    <div>
                        <h4 class="text-gray-800 dark:text-gray-100 font-bold mb-3">{{ note.title_note }}</h4>
                        <p class="text-gray-800 dark:text-gray-100 text-sm">{{ note.content_note }}</p>
                    </div>
                    <div>
                        <div class="flex items-center  text-gray-800 dark:text-gray-100">
                            <p class="text-sm">{{ formatDate(note.createdAt) }}</p>
                            <div class="ml-auto">
                                <button
                                    class="w-8 h-8 rounded-full bg-gray-800 dark:bg-gray-100 dark:text-gray-800 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-black"
                                    aria-label="edit note" role="button">
                                    <img class="dark:hidden"
                                        src="https://tuk-cdn.s3.amazonaws.com/can-uploader/4-by-3-multiple-styled-cards-svg1.svg"
                                        alt="edit" />
                                    <img class="dark:block hidden"
                                        src="https://tuk-cdn.s3.amazonaws.com/can-uploader/4-by-3-multiple-styled-cards-svg1dark.svg"
                                        alt="edit" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
    data() {
        return {
            notes: [],
            query: 1
        }
    },
    mounted() {
        this.getNote()
    },
    methods: {
        formatDate(time) {
            return dayjs(time).format('DD-MM-YYYY');
        },
        async getNote() {
            try {
                const result = await this.$axios.get(`note/get?page=${this.query}`);
                this.notes = result.data.note
            } catch (error) {
                console.log(error)
            }
        }
    },


}
</script>