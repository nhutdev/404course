<template>
    <div class="w-full px-6 mx-auto mb-10">

        <div class="relative flex items-center p-0 mt-6 overflow-hidden bg-center bg-cover min-h-75 rounded-2xl"
            style="background-image: url('https://haycafe.vn/wp-content/uploads/2022/01/Hinh-nen-Macbook-3D-moi-nhat.jpg'); background-position-y: 50%">
            <span
                class="absolute inset-y-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-purple-700 to-pink-500 opacity-60"></span>
        </div>
        <div
            class="relative flex flex-col flex-auto min-w-0 p-4 mx-6 -mt-16 overflow-hidden break-words border-0 shadow-blur rounded-2xl bg-white/80 bg-clip-border backdrop-blur-2xl backdrop-saturate-200">
            <div class="flex flex-wrap -mx-3">
                <div class="flex-none w-auto max-w-full px-3">

                </div>
                <div class="flex-none w-auto max-w-full px-3 my-auto">
                    <div class="h-full">
                        <h5 class="mb-1">Quản lý phân quyền</h5>
                    </div>
                </div>
                <div class="w-full max-w-full px-3 mx-auto mt-4 sm:my-auto sm:mr-0 md:w-1/2 md:flex-none lg:w-4/12">
                    <div class="relative right-0">
                        <ul class="relative flex flex-wrap p-1 list-none bg-transparent rounded-xl flex-col on-resize h-20">

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="flex items-center justify-between m-5">
        <h2 class="text-xl font-bold text-gray-800">Quản lý phân quyền</h2>
        <div class="flex">
            <input type="search" id="default-search"
                class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 "
                placeholder="Tìm kiếm theo tiêu đề...">
        </div>
    </div>
    <!--tab view role-->
    <div
        class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul class="flex flex-wrap">
            <li class="mr-2 cursor-pointer ">
                <a @click="isRoleBtn"
                    :class="['inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300', { 'text-blue-600 border-blue-600 rounded-t-lg font-bold': activeTab === 'role' }]"
                    class=" active inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Vai trò</a>
            </li>
            <li class="mr-2 cursor-pointer ">
                <a @click="isUserRoleBtn"
                    :class="['inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300', { 'text-blue-600 border-blue-600 rounded-t-lg font-bold': activeTab === 'roleuser' }]"
                    class=" active inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Danh sách vai trò</a>
            </li>
        </ul>
    </div>

    <!-- role view-->
    <div class="overflow-x-auto bg-white rounded-lg shadow cursor-pointer" v-if="showRole">
        <table class="w-full whitespace-no-wrap bg-white overflow-hidden table-striped ">
            <thead>
                <tr class="text-left ">
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">STT</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Tên chức vụ</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Hành động</th>
                </tr>
            </thead>
            <tbody class="text-sm">

                <tr class="focus-within:bg-gray-200 overflow-hidden" v-for="(role, index) in roles" :key="index">
                    <td class="border-t">
                        <span class="text-gray-700 px-6 py-4 flex items-center">{{ index + 1 }}</span>
                    </td>
                    <td class="border-t">
                        <span class="text-gray-700 px-6 py-4 flex items-center">
                            {{ role.name_role }}
                        </span>
                    </td>
                    <td class="border-t flex">
                        <span
                            class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Xóa</span>
                        <span
                            class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Cập
                            nhập</span>
                    </td>
                </tr>

            </tbody>

        </table>


    </div>
<!--user role view-->
<!--bộ lọc-->
<div class=" md:mr-2 mt-5 py-2 px-2" v-if="showUserRole">
        <select id="select" name="select" v-model="roleid" @change="getUserRole()"
            class="block appearance-none w-full bg-white border px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none">
            <option v-for="role in roles" :key="role.id" :value="role.id">
                    {{ role.name_role }}
                </option>
        </select>
    </div>
<div class="overflow-x-auto bg-white rounded-lg shadow cursor-pointer" v-if="showUserRole">
    
        <table class="w-full whitespace-no-wrap bg-white overflow-hidden table-striped ">
            <thead>
                <tr class="text-left ">
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">STT</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Tên vai trò</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Họ tên người dùng</th>
                    <th class="px-6 py-3 text-gray-500 font-bold tracking-wider uppercase text-xs">Hành động</th>
                </tr>
            </thead>
            <tbody class="text-sm">

                <tr class="focus-within:bg-gray-200 overflow-hidden" v-for="(roleuser, index) in userRoles" :key="index">
                    <td class="border-t">
                        <span class="text-gray-700 px-6 py-4 flex items-center">{{ index + 1 }}</span>
                    </td>
                    <td class="border-t">
                        <span class="text-gray-700 px-6 py-4 flex items-center">
                            {{ roleuser.role.name_role }}
                        </span>
                    </td>
                    <td class="border-t">
                        <span class="text-gray-700 px-6 py-4 flex items-center">
                            {{ roleuser.user.fullname }}
                        </span>
                    </td>
                    <td class="border-t flex">
                        <span
                            class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Xóa</span>
                        <span
                            class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Cập
                            nhập</span>
                    </td>
                </tr>

            </tbody>

        </table>


    </div>
    
       <!--chi muc-->
       <div class="grid sm:grid-cols-3 gap-4 grid-cols-2  mb-10 mt-5">
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
    <toast ref="toast"></toast>
</template>

<script>
import dayjs from 'dayjs';
import toast from '../../components/toast/toast.vue';
import adminService from '../../plugins/adminService'
export default {
    data() {
        return {
            roles: [], userRoles:[],
            page: 1,activeTab : 'role',
            showRole:true,showUserRole:false,
            roleid:''
        }
    },
    components:
    {
        toast
    },
    mounted() {
        this.getRole()
    },
    methods:
    {
        formattedDate(time) {
            return dayjs(time).format('DD-MM-YYYY HH:mm:ss');
        },
        isRoleBtn()
        {
            this.activeTab = 'role'
            this.showRole = true
            this.showUserRole = false
        },
        isUserRoleBtn()
        {
            this.getUserRole()
            this.activeTab = 'roleuser'
            this.showRole = false
            this.showUserRole = true
        },
        getRole() {
            adminService.getRole().then((data) => { this.roles = data });
        },
        getUserRole()
        {
           if(this.roleid == '')
           {
            adminService.getUserRole(this.page).then((data)=>{this.userRoles = data})
           }else
           {
            console.log(this.roleid)
            adminService.getUserRole(this.page).then((data)=>{this.userRoles = data.filter(item=>item.id_role == this.roleid)})
           }
        }

    }
}
</script>