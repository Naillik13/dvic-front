<template>
  <div class="hello">
    <div class="container">
      <form class="form-signup row" @submit.prevent="signup">
        <div class="col-6 offset-3">
          <h1 class="h3 mb-4 font-weight-normal">Create an account for your company</h1>
          <div>
            <label for="inputEmail">Email address *</label>
            <input required v-model="email" type="email" id="inputEmail" class="form-control mb-3" placeholder="Email address">
            <label for="inputPassword">Password *</label>
            <input required v-model="password" type="password" id="inputPassword" class="form-control mb-3" placeholder="Password">
            <label for="inputPasswordConfirmation">Password confirmation *</label>
            <input required v-model="passwordConfirmation" type="password" id="inputPasswordConfirmation" class="form-control mb-3" placeholder="Password">
          </div>
          <div>
            <p class="text-danger"> {{error}}</p>
            <button class="btn btn-lg btn-primary btn-block mb-4" type="submit">Create account</button>
            <div class="mb-3 text-center">OR</div>
            <div class="text-center">
              <router-link to="/login">
                Login to an existing account
              </router-link>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {HTTP} from '../common/http-common'
import { AUTH_REQUEST } from '../store/actions/auth'

export default {
  name: 'SignUp',
  data () {
    return {
      email: '',
      password: '',
      passwordConfirmation: '',
      error: ''
    }
  },
  methods: {
    signup: function () {
      const { email, password, passwordConfirmation } = this

      HTTP.post('users', {email, password, passwordConfirmation}).then(_ => {
        this.$store.dispatch(AUTH_REQUEST, { email, password }).then(() => {
          this.$router.push('/create-company')
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
</style>
