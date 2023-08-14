<template>
<navbar/>
 <router-view />
</template>

<script>
import { onMounted } from 'vue';
import navbar from '../components/header/navbar.vue'
import userService from '../plugins/userService';
export default {
  data() {
    return {
     user:''
    }
  },
  mounted()
  {
    this.user = userService.getUserToken()
    if(this.user.role != 'Learner')
    {
      this.$router.push({ name: 'login' });
      
    }
  },
components:{navbar},
  }
  
  
</script>