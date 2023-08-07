<template>
  <nav class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <!--logo brand-->
      <a class="flex items-center">
        <!-- <img
          src="https://media.discordapp.net/attachments/1137648162677456956/1137648336925630495/404-removebg-preview.png"
          class="h-8 mr-3" alt="Flowbite Logo"> -->
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">404Learn</span>
      </a>

      <!--center search-->
      <div class="flex md:order-1 w-1/3">

        <label for="simple-search" class="sr-only">Search</label>
        <div class="hidden md:block relative w-full">
          <input type="text" id="simple-search"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Tìm kiếm tài liệu..." required>
        </div>
        <button type="submit"
          class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </button>


        <button data-collapse-toggle="navbar-sticky" type="button" @click="handleNavbar()"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-sticky" aria-expanded="false">
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
      </div>

      <!--right-->
      <div class="items-center justify-between hidden w-full md:flex md:w-auto  md:order-2">
        <div class="block profile-pic ml-2">
          <img :src="user.avatar" alt="pic 1" class="rounded-full w-10 h-10 object-cover cursor-pointer"
            @click="opendropdown" />
        </div>
      </div>

      <!--right reponsive-->
      <div class="items-center justify-between  w-full md:flex md:w-auto  md:order-2" v-if="hidden" id="navbar-sticky">
        <div
          class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <div class="block profile-pic ml-2">
            <img :src="user.avatar" alt="pic 1" class="rounded-full w-10 h-10 object-cover cursor-pointer"
              @click="opendropdown" />
          </div>

          <div class="block md:hidden relative w-full">
            <input type="text" id="simple-search"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Tìm kiếm tài liệu..." required>
          </div>
        </div>
      </div>

    </div>
  </nav>

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
            <a class="block px-4 py-2  ">Thay đổi mật
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
  
</template>

<script>
import userService from '../../plugins/userService'
export default {
  data() {
    return {
      showdropdown: false,
      user: '',
      hidden: false
    }
  },
  mounted() {
    this.user = userService.getUserToken()
  },
  methods:
  {
    opendropdown() {
      this.showdropdown = !this.showdropdown
    },
    handleNavbar() {
      this.hidden = !this.hidden
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