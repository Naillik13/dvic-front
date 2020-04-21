<template>
  <div class="hello">
    <div class="container">
      <table class="table">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
          <th scope="col">Duration</th>
          <th scope="col">Client</th>
          <th scope="col">Type</th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="(project, index) in projects"  :key="project._id">
            <th scope="row">{{ index }}</th>
            <td>{{ project.name }}</td>
            <td>{{ project.description }}</td>
            <td>{{ project.duration }}</td>
            <td>{{ project.client.name }}</td>
            <td>{{ project.type.label }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {HTTP} from '../../common/http-common'
export default {
  name: 'ProjectList',
  data () {
    return {
      projects: []
    }
  },
  created () {
    HTTP.get('companies/' + localStorage.getItem('company-id') + '/projects').then(response => {
      // JSON responses are automatically parsed.
      this.projects = response.data
    })
      .catch(e => {
        this.errors.push(e)
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-weight: normal;
}
</style>
