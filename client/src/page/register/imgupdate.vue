<template>
    <div class=" bg-white w-full md:max-w-md mx-auto  overflow-y-auto ">
        <div class="flex flex-row py-3 px-4">
            <h2 class="text-lg font-semibold flex-grow">Cập nhập ảnh</h2>
        </div>
        <div class="py-4 px-4">
            <!--bắt đầu img-->
            <div class="flex items-center justify-center w-full">
                <label for="dropzone-file" v-if="showimg"
                    class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12">
                            </path>
                        </svg>
                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Nhấn để tải
                                ảnh hoặc video lên</span> </p>
                        <!-- <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p> -->
                    </div>
                    <input id="dropzone-file" type="file" class="hidden" accept=".png, .jpeg, .gif, .jpg"
                        @change="onFileSelected" />
                </label>
                <img class="max-w-sm w-full mx-auto h-32 md:h-64 mt-1" :src="imageUrl" alt="" v-if="!showimg">
            </div>
            <p class="text-red-500 text-sm ml-1" v-if="!avatar && avatarFocusted">Vui lòng chọn ảnh.</p>
            <!--kết thúc img-->

        </div>

        <div class="modal-footer py-3 px-4 ">
            <button
                class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer mr-4"
                @click="updateImg">Cập nhập</button>
            <button
                class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer"
                @click="onclose()">Đóng</button>
        </div>
    </div>
    <toast ref="toast"></toast>
</template>

<script>

import toast from '../../components/toast/toast.vue'
export default {
    emits: ["cancel"],
    data() {
        return {
            user: '',
            avatar: null,
            showimg: true,
            imageUrl: '',
            avatarFocusted: false,
        };
    },
    components: { toast },
    mounted() {
    },
    methods: {

        onclose() {
            this.$emit('cancel')
        },
        onFileSelected(event) {
            this.avatar = event.target.files[0]
            this.imageUrl = URL.createObjectURL(this.avatar);
            this.showimg = false
            console.log(this.avatar)
        },
        async updateImg() {
            this.avatarFocusted = true
            if (this.avatar) {
                const formData = new FormData();
                formData.append('avatar', this.avatar);
                try {
                    const response = await this.$axios.put(`user/newAvatar/${this.$route.params.id}`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                    if (response.status == 200) {
                        this.$refs.toast.showToast(response.data.message)
                        setTimeout(() => {
                            window.location.href = `${import.meta.env.VITE_API_BASE_FE}/`;
                        }, 2000)

                    }
                } catch (error) {
                    console.error(error);
                }
            }

        },
    },
}

</script>
