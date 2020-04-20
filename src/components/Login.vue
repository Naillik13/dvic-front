<template>
  <div class="hello">
    <div class="container">
      <form class="form-login" @submit.prevent="login">
        <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input required v-model="email" type="email" id="inputEmail" class="form-control" placeholder="Email address">
        <label for="inputPassword" class="sr-only">Password</label>
        <input required v-model="password" type="password" id="inputPassword" class="form-control mb-3" placeholder="Password">
        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      </form>
    </div>
  </div>
</template>

<script>
import { AUTH_REQUEST } from '../store/actions/auth'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login: function () {
      const { email, password } = this
      this.$store.dispatch(AUTH_REQUEST, { email, password }).then(() => {
        this.$router.push('/')
      })
    }
  }
}
</script>

<style scoped>
  .form-login {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
  }
  .btn-block {
    color: #fff;
    background-color: #42b983;
    border-color: #42b983;
  }
  .form-login input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
  .form-login input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
</style>
