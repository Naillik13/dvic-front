<template>
  <div class="hello">
    <div class="container">
      <form class="form-signup row" @submit.prevent="createClient">
        <div class="col-6 offset-3">
          <h1 class="h3 mb-4 font-weight-normal">Create an account for your company</h1>
          <div>
            <label for="inputClientName">Client name *</label>
            <input required v-model="name" type="text" id="inputClientName" class="form-control mb-3" placeholder="Client name">
            <label for="inputClientSiret">Client siret *</label>
            <input required v-model="siret" type="text" id="inputClientSiret" class="form-control mb-3" placeholder="Siret">
            <label for="inputClientContact">Client contact *</label>
            <input required v-model="contact" type="email" id="inputClientContact" class="form-control mb-3" placeholder="contact@company.com">
          </div>
          <div>
            <p class="text-danger"> {{error}}</p>
            <button class="btn btn-lg btn-primary btn-block mb-4" type="submit">Create client</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {HTTP} from '../../common/http-common'
import {mapState} from 'vuex'

export default {
  name: 'CreateClient',
  data () {
    return {
      name: '',
      siret: '',
      contact: '',
      error: ''
    }
  },
  computed: mapState({company: 'company'}),
  methods: {
    createClient: function () {
      const { name, siret, contact } = this
      console.log(this.company.company._id)
      HTTP.post('clients', {name: name, siret: siret, contact: contact, company: this.company.company._id}).then(_ => {
        this.$router.push('/clients')
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
