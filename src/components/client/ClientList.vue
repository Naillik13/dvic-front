<template>
  <div class="hello">
    <div class="container">
      <table class="table">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Siret</th>
          <th scope="col">Contact</th>
        </tr>
        </thead>
        <tbody>
          <tr v-for="(client, index) in clients"  :key="client.email">
            <th scope="row">{{ index }}</th>
            <td>{{ client.name }}</td>
            <td>{{ client.siret }}</td>
            <td>{{ client.contact }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {HTTP} from '../../common/http-common'
export default {
  name: 'ClientList',
  data () {
    return {
      clients: []
    }
  },
  created () {
    HTTP.get('companies/' + localStorage.getItem('company-id') + '/clients').then(response => {
      // JSON responses are automatically parsed.
      this.clients = response.data
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
