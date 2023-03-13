<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="handleSubmit">
      <label for="email">Emial:</label>
      <input type="email" name="email" v-model="email">
      <div v-show="submitted && !email"> Email is required</div>
      <br><br>
      <label for="password">Password:</label>
      <input type="password" name="password" v-model="password">
      <div v-show="submitted && !password"> Password is required</div>
      <br><br>

      <button>Login button</button>
      <div v-if="error1">{{ error1 }}</div>
    </form>
  </div>

</template>

<script>

import EmailValidator from 'email-validator'
import { userService } from '../../services/users.services'

export default {
  data() {
    return {
      email: "",
      password: "",
      submitted: false,
      error1 :"",
    }
  },
  methods: {
    handleSubmit(e) {

      this.submitted = true
      ////
      this.error = ""
      const { email, password } = this
      if (!(email && password)) {
        return;
      }
      console.log("tesr")
      ////
      if (!(EmailValidator.validate(email))) {
        this.error = "Email must be valid"
        return;
      }
      console.log("tesr")
      //const password_pattern = /^(?=(.*[a-z]))(?=(.*[A-Z]))/
      // if (!(password_pattern.test(password))) {
      // this.eror = "Password not strong enough"

      //  return;
      //}



      userService.login(email, password)
        .then(result => {
          console.log("Auth - go to dashboard")
          this.$router.push("/Dashboard")
        })
        .catch(error1 => this.error1 = error1)








    }
  }

}

</script>

<style scoped>

</style>
 
