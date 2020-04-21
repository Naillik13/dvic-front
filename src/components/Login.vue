<template>
  <div class="hello">
    <div class="container">
      <div class="row">
        <form class="form-login offset-3 col-6" @submit.prevent="login">
          <h1 class="h3 mb-3 text-center font-weight-normal">Please sign in</h1>
          <label for="inputEmail" class="sr-only">Email address</label>
          <input required v-model="email" type="email" id="inputEmail" class="form-control" placeholder="Email address">
          <label for="inputPassword" class="sr-only">Password</label>
          <input required v-model="password" type="password" id="inputPassword" class="form-control mb-3" placeholder="Password">
          <p class="text-danger"> {{error}}</p>
          <button class="btn btn-lg btn-primary btn-block mb-4" type="submit">Sign in</button>
          <div class="mb-3 text-center">OR</div>
          <div class="text-center">
            <router-link to="/signup">
              Create an account for your company
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { AUTH_REQUEST } from '../store/actions/auth'
import {COMPANY_USER_REQUEST} from '../store/actions/company'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    login: function () {
      const { email, password } = this
      this.$store.dispatch(AUTH_REQUEST, { email, password }).then((userId) => {
        this.$store.dispatch(COMPANY_USER_REQUEST, userId).then(() => {
          this.$router.push('/')
        })
      }).catch(err => {
        if (err.response.data) {
          this.error = err.response.data.message
        }
      })
    }
  }
}
</script>

<style scoped>
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
