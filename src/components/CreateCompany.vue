<template>
  <div class="hello">
    <div class="container">
      <form class="form-signup row" @submit.prevent="createCompany">
        <div class="col-6 offset-3">
          <h1 class="h3 mb-4 font-weight-normal">Create your company</h1>
          <div>
            <label for="inputCompanyName">Company name *</label>
            <input required v-model="companyName" type="text" id="inputCompanyName" class="form-control mb-3" placeholder="Company name">
            <label for="inputCompanySiret">Company siret (14 digits) *</label>
            <input required v-model="companySiret" type="text" id="inputCompanySiret" class="form-control mb-3" placeholder="Company siret">
          </div>
          <p class="text-danger">{{error}}</p>
          <button class="btn btn-lg btn-primary btn-block mb-4" type="submit">Create company</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {COMPANY_REQUEST} from '../store/actions/company'

export default {
  name: 'CreateCompany',
  data () {
    return {
      companyName: '',
      companySiret: '',
      error: ''
    }
  },
  methods: {
    createCompany: function () {
      const { companyName, companySiret } = this
      this.$store.dispatch(COMPANY_REQUEST, { name: companyName, siret: companySiret, owner: localStorage.getItem('user-id') }).then(() => {
        this.$router.push('/')
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
