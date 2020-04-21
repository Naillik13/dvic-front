<template>
  <div class="hello">
    <div class="container">
      <form class="form-signup row" @submit.prevent="createProjectType">
        <div class="col-6 offset-3">
          <h1 class="h3 mb-4 font-weight-normal">Add a new project to your company</h1>
          <div>
            <label for="inputProjectName">Project name *</label>
            <input required v-model="name" type="text" id="inputProjectName" class="form-control mb-3" placeholder="Name">
            <label for="inputProjectType">Project type *</label>
            <select required v-model="type" class="form-control mb-3" id="inputProjectType">
              <option v-for="projectType in projectTypes" :value="projectType._id" :key="projectType._id">
                {{ projectType.label }}
              </option>
            </select>
            <label for="inputProjectClient">Project client *</label>
            <select required v-model="client" class="form-control mb-3" id="inputProjectClient">
              <option v-for="client in clients" :value="client._id" :key="client._id">
                {{ client.name }}
              </option>
            </select>
            <label for="inputProjectDescription">Project description</label>
            <textarea v-model="description" type="text" id="inputProjectDescription" class="form-control mb-3" placeholder="Description"></textarea>
            <label for="inputProjectDuration">Project duration (days)</label>
            <input v-model="duration" type="number" id="inputProjectDuration" class="form-control mb-3" placeholder="Duration">
          </div>
          <div>
            <p class="text-danger"> {{error}}</p>
            <button class="btn btn-lg btn-primary btn-block mb-4" type="submit">Create project type</button>
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
  name: 'CreateProject',
  data () {
    return {
      name: '',
      description: '',
      duration: '',
      type: '',
      client: '',
      projectTypes: [],
      clients: [],
      error: ''
    }
  },
  created () {
    HTTP.get('companies/' + localStorage.getItem('company-id') + '/project-types').then(response => {
      // JSON responses are automatically parsed.
      this.projectTypes = response.data
    })

    HTTP.get('companies/' + localStorage.getItem('company-id') + '/clients').then(response => {
      // JSON responses are automatically parsed.
      this.clients = response.data
    })
  },
  computed: mapState({company: 'company'}),
  methods: {
    createProjectType: function () {
      const { name, description, duration, type, client } = this
      HTTP.post('projects', {name: name, description: description, duration: duration, client: client, type: type, company: this.company.companyId}).then(_ => {
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
