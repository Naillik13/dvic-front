<template>
  <div class="hello">
    <div class="container">
      <form class="form-signup row" @submit.prevent="createProjectType">
        <div class="col-6 offset-3">
          <h1 class="h3 mb-4 font-weight-normal">Add a new type of project to your company</h1>
          <div>
            <label for="inputProjectTypeCode">Project type code *</label>
            <input required v-model="code" type="text" id="inputProjectTypeCode" class="form-control mb-3" placeholder="Code">
            <label for="inputProjectTypeLabel">Project type label *</label>
            <input required v-model="label" type="text" id="inputProjectTypeLabel" class="form-control mb-3" placeholder="Label">
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
  name: 'CreateProjectType',
  data () {
    return {
      code: '',
      label: '',
      error: ''
    }
  },
  computed: mapState({company: 'company'}),
  methods: {
    createProjectType: function () {
      const { code, label } = this
      console.log(this.company.company._id)
      HTTP.post('project-types', {code: code, label: label, company: this.company.company._id}).then(_ => {
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
