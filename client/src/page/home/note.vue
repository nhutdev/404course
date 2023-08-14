<template>
    <!--add--> 
    <div class=" mt-5 editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl" v-if="showAdd">
        <input class="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" spellcheck="false" v-model="title"
            placeholder="Tiêu đề note" type="text">
        <textarea class="description bg-gray-100 sec p-3 h-20 border border-gray-300 outline-none" spellcheck="false" v-model="content"
            placeholder="Nhập nội dung note"></textarea>

        <!-- icons -->
        <div class="icons flex text-gray-500 m-2">
            <div>
                <label for="img-file">
                    <i class="text-violet-500 uil-image-plus text-2xl"></i>
                    <input id="img-file" type="file" @change="onFileSelected" hidden accept=".png, .jpeg, .gif, .jpg" />
                </label>
            </div>
        </div>
        <!-- buttons -->
        <div class="buttons flex">
            <div
                class="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500" @click="addNote()">
                Thêm</div>
                <div
                class="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500" @click="openAdd()">
                Hủy</div>
        </div>
    </div>

    <!--view-->
    <div class="mx-auto container py-2 px-6">
    <button @click = "openAdd()" v-if="!showAdd" type="button" class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 ">Thêm</button>
        <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
            <div class="rounded" v-for="(note, index) in notes" :key="index">
                <div class="w-full h-64 flex flex-col justify-between dark:bg-gray-800 rounded-lg border border-gray-400 mb-6 py-5 px-4"
                    :style="{ background: colorArray[index % colorArray.length] }">
                    <div>
                        <h4 class="text-gray-800 dark:text-gray-100 font-bold mb-3">{{ note.title_note }}</h4>
                        <p class="text-gray-800 dark:text-gray-100 text-sm">{{ note.content_note }}</p>
                    </div>
                    <div>
                        <div class="flex items-center  text-gray-800 dark:text-gray-100">
                            <p class="text-sm">{{ formatDate(note.createdAt) }}</p>
                            <div class="ml-auto">
                                <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2" @click="oncloseUpdate(),getText(note)">Cập nhập</button>
                                <button type="button" class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 " @click="deleteNote(note.id)">Xóa</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!--popup edit - deleteNote -->
    <div class=" fixed w-full h-full top-0 left-0 flex items-center justify-center z-50 " v-show="isShowUpdate">
        <div class="absolute w-full h-full bg-gray-900 opacity-50" @click="oncloseUpdate"></div>

        <div class=" bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto " >
            <div class="flex flex-row py-3 px-4">
                <h5 class="text-lg font-semibold flex-grow">Cập nhập ghi chú</h5>
                <i class="uil-multiply flex-none cursor-pointer bg-gray-400 rounded-xl" @click="oncloseUpdate"></i>
            </div>
        
            <div class="px-4">
                <div>
                    <label  class="block mb-2 text-sm font-medium text-gray-900 ">Tiêu đề</label>
                    <input type="text" class="bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none " v-model="title" required>
                </div>
                <div>
                    <label  class="block mb-2 text-sm font-medium text-gray-900 ">Nội dung</label>
                    <textarea class="description bg-gray-100 sec p-3 h-20 border border-gray-300 outline-none" spellcheck="false" v-model="content"
            placeholder="Nhập nội dung note"></textarea>
                </div>
            </div>

            <div class="py-3 px-4">
                <button
                    class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer mr-4" @click="updateNote">Cập nhập</button>
                <button
                    class="  py-2 px-4 bg-gradient-to-r from-indigo-100 via-purple-300 to-pink-200 text-white rounded-lg cursor-pointer"
                    @click="oncloseUpdate()">Đóng</button>
            </div>
        </div>
    </div>

    <toast ref="toast"></toast>
</template>

<script>
import dayjs from 'dayjs';
import userService from '../../plugins/userService';
import toast from '../../components/toast/toast.vue';
export default {
    data() {
        return {
            notes: [],
            query: 1,
            user: '',
            colorArray: [],
            showAdd:false,
            showdropdown: false,
            title:'',
            content:'',
            isShowUpdate:false,
            note:'',
            id:''
        }
    },
    components:{toast},
    mounted() {
        this.user = userService.getUserToken()
        this.getNote();
        for (let i = 0; i < 10; i++) {
            const red = Math.floor(Math.random() * 256);
            const green = Math.floor(Math.random() * 256);
            const blue = Math.floor(Math.random() * 256);
            const rgba = `rgba(${red}, ${green}, ${blue}, 0.2)`;
            this.colorArray.push(rgba);
        }
    },
    methods: {
        formatDate(time) {
            return dayjs(time).format('DD-MM-YYYY');
        },
        async getNote() {
            try {

                const result = await this.$axios.get(`note/get?page=${this.query}&id=${this.user.id}`);
                this.notes = result.data.note
            } catch (error) {
                console.log(error)
            }
        },
        async deleteNote(id)
        {
            try {
            const result = await this.$axios.delete(`note/delete/`+ id);
                if(result.status == 200)
                {
                    this.$refs.toast.showToast(result.data.message)
                    this.getNote()
                }
                else
                {
                    this.$refs.toast.showToast(result.data.message)
                }
            } catch (error) {
                console.log(error)
            }
        },
        async addNote()
        {
            try {
                const result = await this.$axios.post(`note/add`,
                {
                    title_note:this.title, content_note:this.content, id_user:this.user.id
                });
                if(result.status == 200)
                {
                    this.$refs.toast.showToast(result.data.message)
                    this.getNote()
                    this.clearText()
                    this.showAdd = false
                }
                else
                {
                    this.$refs.toast.showToast(result.data.message)
                }
            } catch (error) {
                console.log(error)
            }
        },
        async updateNote()
        {
            try {
                const result = await this.$axios.put(`note/update/${this.id}`,
                {
                    title_note:this.title, content_note:this.content, id_user:this.user.id
                });
                if(result.status == 200)
                {
                    this.$refs.toast.showToast(result.data.message)
                    this.getNote()
                    this.clearText()
                    this.isShowUpdate = false
                }
                else
                {
                    this.$refs.toast.showToast(result.data.message)
                } 
            } catch (error) {
                console.log(error)
            }
        },
        getText(note){
            this.title = note.title_note;
            this.content = note.content_note;
            this.id = note.id
        },
        clearText()
        {
            this.title =''
            this.content = ''
        },
        opendropdown() {
            this.showdropdown = !this.showdropdown
        },
        openAdd()
        {
            this.showAdd = !this.showAdd
        },
        oncloseUpdate()
        {
            this.isShowUpdate = !this.isShowUpdate
        }
    },


}
</script>