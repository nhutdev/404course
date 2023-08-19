<template>
 
  <div >
       <div class="bg-white dark:bg-gray-800 rounded shadow-lg py-5 px-7">
         <nav class="flex justify-between">
           <div class="flex items-center space-x-3 lg:pr-16 pr-6">
             <img class="cursor-pointer dark:bg-white p-1 rounded-full" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/header-1-svg1.svg" alt="circle" />
             <h2 class="font-normal text-2xl leading-6 text-gray-800 dark:text-white">404Learn</h2>
           </div>
 
           <!-- For medium and plus sized devices -->
           <ul class="hidden md:flex flex-auto space-x-2" >
             <li  v-for="route in routes" :key="route.name"  class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-gray-600 border border-white bg-gray-50 cursor-pointer px-3 py-2.5 font-normal text-base leading-3 shadow-md rounded">
               <router-link :to="route.path">{{ route.name }}</router-link>
             </li>
             <li  v-if="showCreator" class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-gray-600 border border-white bg-gray-50 cursor-pointer px-3 py-2.5 font-normal text-base leading-3 shadow-md rounded">
               <router-link to="/creator" >Quản lý khóa học</router-link>
             </li>
           </ul>
 
           <div class="flex space-x-5 justify-center items-center pl-2">
             <img class="cursor-pointer dark:bg-white rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/header-1-svg3.svg" alt="bell" />
             <div class="profile-pic ml-2">
          <img :src="user.avatar" alt="pic 1" class="rounded-full w-10 h-10 object-cover cursor-pointer"
            @click="opendropdown" />
        </div>
            </div>
           
         </nav>
         <!-- for smaller devcies -->
 
         <div class="block md:hidden w-full mt-5"  @click="handleNavbar()">
           <div class="cursor-pointer px-4 py-3 text-white bg-indigo-600 rounded flex justify-between items-center w-full">
             <div class="flex space-x-2">
               <p id="textClicked" class="font-normal text-sm leading-3 focus:outline-none hover:bg-gray-800 duration-100 cursor-pointer">Bảng chọn</p>
             </div>
             <img id="ArrowSVG" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/header-1-svg4.svg" alt="down arrow" class="rotate-180 transform" />
           </div>
           <div class="relative">
             <ul id="list" class=" font-normal text-base leading-4 absolute top-2 w-full rounded shadow-md z-20" v-if="hidden">
               <li   v-for="route in routes" :key="route.name"  class="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal focus:text-black">
                 <router-link :to="route.path">{{ route.name }}</router-link>
               </li>
               <li class="px-4 py-3 text-gray-600 bg-gray-50 border border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal focus:text-black" v-if="showCreator">
                <router-link to="/creator" >Quản lý khóa học</router-link>
               </li>
             </ul>
           </div>
         </div>
 
       </div>
     </div>
   
   
    <!--dropdown-->
  <div class=" fixed w-full h-full top-0 left-0 flex items-center justify-center z-50 overflow-auto " v-if="showdropdown">
    <div class="absolute w-full h-full bg-gray-900 opacity-50"></div>

    <div class=" bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto ">
      <div class="flex flex-row py-3 px-4">
        <h5 class="text-lg font-semibold flex-grow">Bảng chọn</h5>
        <i class="uil-multiply flex-none cursor-pointer bg-gray-400 rounded-xl" @click="opendropdown"></i>
      </div>
      <div class="py-4 px-4">

        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200 cursor-pointer">
          <li class="py-2 px-1 flex items-center  hover:bg-gray-100">
            <i class=" text-violet-500 uil-chat-bubble-user md:text-xl"></i>
            <a @click="goIn4" class="block  px-4 py-2  ">Thông tin khách
              hàng</a>
          </li>
          <li class="py-2 px-1  flex items-center hover:bg-gray-100">
            <i class=" text-violet-500  uil-keyhole-square md:text-xl"></i>
            <a class="block px-4 py-2  " @click="onShowChange">Thay đổi mật
              khẩu</a>
          </li>
          <li class="py-2 px-1  flex items-center hover:bg-gray-100" @click="outWeb">
            <i class=" text-violet-500 uil-exit md:text-xl"></i>
            <a class="block px-4 py-2  ">Đăng xuất</a>
          </li>
        </ul>

      </div>


    </div>
  </div>
  <changePass v-if="showChange" @cancel="onShowChange"/>
  <toast ref="toast"></toast>
 </template>
 
 <script>
 import userService from '../../plugins/userServices'
 import changePass from '../../components/changePass.vue'
 import toast from '../toast/toast.vue'
 export default {
   data() {
     return {
       showdropdown: false,showCreator:false,showChange:false,hidden: false,
       user: '',   
       routes: [
         { path: "/home", name: "Trang chủ" },
         { path: "/home/note", name: "Ghi chú" },
         { path: "/home/blogs", name: "Blog" }
       ]
     }
   },
   components:{toast,changePass},
   mounted() {
     this.user = userService.getUserToken()
     if(this.user.role == 'Creator')
     {
      this.showCreator = true
     }
   },
   methods:
   {
     opendropdown() {
       this.showdropdown = !this.showdropdown
     },
     handleNavbar() {
       this.hidden = !this.hidden
     },
     onShowChange()
     {
      this.showChange = !this.showChange
     },
     outWeb() {
       localStorage.removeItem('token');
       localStorage.removeItem('user');
       this.$refs.toast.showToast('Đăng xuất thành công')
       setTimeout(() => {
         this.$router.push({ name: 'login' });
       }, 1000)
     },
   }
 
 }
 </script>