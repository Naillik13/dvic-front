<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {HTTP} from './common/http-common'
import {AUTH_LOGOUT} from './store/actions/auth'

export default {
  name: 'App',
  created: function () {
    HTTP.interceptors.response.use(undefined, function (err) {
      return new Promise(function () {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          // if you ever get an unauthorized, logout the user
          this.$store.dispatch(AUTH_LOGOUT)
          this.$router.push('/login')
        }
        throw err
      })
    })
  }
}
</script>

<style>
  @import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
  }
  .form-control:focus {
    border-color: #41b983;
    -webkit-box-shadow: 0 0 0 0.2rem rgba(65, 185, 131, 0.28);
    box-shadow: 0 0 0 0.2rem rgba(65, 185, 131, 0.28);
  }
  a {
    color: #42b983;
  }
  a:hover {
    text-decoration: none;
    color: #1b5f40;
  }
  .btn {
    color: #fff;
    background-color: #42b983;
    border-color: #42b983;
  }
  .btn:hover {
    background-color: #1b5f40;
    border-color: #1b5f40;
  }
</style>
