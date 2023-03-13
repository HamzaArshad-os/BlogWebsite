<template class="black-background">

  

  <div>
    <nav>
      <router-link class="menu" to="/" v-if="$route.path != '/'">Home </router-link>
      <router-link class="menu" to="/Login"  v-if="$route.path != '/Login', $route.path != '/Dashboard'">Login </router-link>
      <router-link class="menu" to="/DashBoard" v-if="$route.path != '/Login' || $route.path != '/Dashboard'">DashBoard </router-link>
      <router-view />
    </nav>
    


   

  </div>
   <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">





</template>
<script>

import Login from "./pages/Login.vue"
import Article from "./pages/Article.vue"
import DashBoard from "./pages/Dashboard.vue"





export default {
  data() {
    return {

    }
  },

  methods: {

  },
  components: {
    Login,
    Article,
    DashBoard,

  }
}

</script>

<style scoped>
.menu{
  font-size:large;
  margin-right: 1vw;
}

.black-background {
  background-color: black;
}
</style>