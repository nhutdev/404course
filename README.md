# 404course
This is a website to share documents from 404 Group under Product team.

# table 
https://dbdiagram.io/d/64cefb5602bd1c4a5e4da952

# create DB with sequelize-cli
+ B1 : create database in localhost or hosting
+ B2 : npx sequelize-cli db:migrate

# client 
+ B1: cd client
+ B2: npm i

# backend
+ B1: cd backend
+ B2: npm i

# DB
+ Roles - setdefault
- 1:Learner 2:Admin 3:Creator

<div class="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto"
       >

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
                <div class="p-6 space-y-6" >
                    <!--comment cấp 1-->
                    <article class=" mb-6 text-base bg-white rounded-lg " v-for="cmt in comments">
                        <footer class="flex justify-between items-center mb-2">
                            <div class="flex items-center">
                                <p class="inline-flex items-center mr-3 text-sm text-gray-900 "><img
                                        class="mr-2 w-6 h-6 rounded-full"
                                        :src="cmt.user.avatar"
                                        >{{ cmt.user.fullname }}</p>
                                <p class="text-sm text-gray-600 dark:text-gray-400">{{ formatDate(cmt.createdAt) }}</p>
                            </div>
                            <!--menu edit comment cấp 1-->
                            <button @click="showEditLV1(cmt.id)" :class="getEditLV1(cmt.user.id)"
                                class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                type="button">
                                <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z">
                                    </path>
                                </svg>
                              
                            </button>
                            <!-- Dropdown menu -->
                            <div id="dropdownComment1" v-if="isShowEditLV1 && idComment == cmt.id"
                                class=" z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                <ul class="py-1 text-sm text-gray-700 dark:text-gray-200"
                                    aria-labelledby="dropdownMenuIconHorizontalButton">
                                    <li>
                                        <a href="#"
                                            class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Chỉnh sửa</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                            class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" @click="deleteCmt(cmt.id)">Xóa</a>
                                    </li>
                                    
                                </ul>
                            </div>
                        </footer>
                        <p class="text-gray-500 dark:text-gray-400">{{ cmt.comment }}</p>
                        <!--tra lời comment-->
                        <div class="flex items-center mt-4 space-x-4">
                            <button type="button"
                                class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
                                <svg aria-hidden="true" class="mr-1 w-4 h-4" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z">
                                    </path>
                                </svg>
                                Trả lời
                            </button>
                        </div>
                    </article>
                    <!--comment cấp 2-->

                    <!--view comment-->
                    <div class="flex items-center mt-2">
                    <img class="w-6 h-6 rounded-full mr-2" :src="user.avatar" alt="Avatar">
                    <textarea class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none text-sm"
                        type="text" v-model="comment" v-on:keyup.enter="addcomment()"
                        placeholder="Thêm bình luận..."></textarea>
                </div>
                </div>
                <!-- Modal footer -->
                <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button data-modal-hide="staticModal" type="button"
                        class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 "
                        @click="openComment">Hủy</button>
                </div>
            </div>
        </div>
    </div>