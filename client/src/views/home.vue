<template>
  <navbar />
  <router-view/>
  <footervue />
</template>

<script>

import navbar from '../components/header/navbar.vue'
import userService from '../plugins/userServices';
import footervue from '../components/footer.vue';
export default {
  data() {
    return {
      user: ''
    }
  },
  mounted() {
    this.user = userService.getUserToken()
    if (this.user.role == 'Admin') {
      this.$router.push({ name: 'login' });
    }
  },
  components: { navbar, footervue },
}


</script>