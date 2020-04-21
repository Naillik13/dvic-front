<template>
  <div class="hello text-center">
    <h1>Bienvenue sur le dashboard de <b>{{ company.companyName }}</b></h1>
    <button class="btn btn-lg btn-primary" v-on:click="logout">Logout</button>
    <div class="container">
      <div class="row">
        <div class="col-lg-5 col-sm-12">
          <div class="row dashboard-section-container">
            <h3 class="col-12 d-flex justify-content-between">Gérer les clients<font-awesome-icon icon="users-cog" /></h3>
            <router-link class="col-4" to="/clients">
              <div class="dashboard-section">
                <font-awesome-icon icon="users" />
                <div>Liste des clients</div>
              </div>
            </router-link>
            <router-link class="col-4"  to="/create-client">
              <div class="dashboard-section">
                <font-awesome-icon icon="user-plus" />
                <div>Ajouter un client</div>
              </div>
            </router-link>
          </div>
        </div>
        <div class="offset-lg-1 col-lg-6 col-sm-12">
          <div class="row dashboard-section-container">
            <h3 class="col-12 d-flex justify-content-between">Gérer les projets<font-awesome-icon icon="network-wired" /></h3>
            <p v-if="!(projectTypes.length > 0 && clients.length > 0)" class="col-12 text-danger text-left">Veuillez créer au moins un client et un type de projet afin d'ajouter votre premier projet.</p>
            <router-link v-if="projectTypes.length > 0 && clients.length > 0" class="col-4" to="/projects">
              <div class="dashboard-section">
                <font-awesome-icon icon="project-diagram" />
                <div>Liste des projets</div>
              </div>
            </router-link>
            <router-link v-if="projectTypes.length > 0 && clients.length > 0" class="col-4"  to="/create-project">
              <div class="dashboard-section">
                <font-awesome-icon icon="briefcase" />
                <div>Ajouter un projet</div>
              </div>
            </router-link>
            <router-link class="col-4"  to="/create-project-type">
              <div class="dashboard-section">
                <font-awesome-icon icon="tasks" />
                <div>Créer un type de projet</div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {HTTP} from '../common/http-common'
import {AUTH_LOGOUT} from '../store/actions/auth'

export default {
  name: 'Dashboard',
  computed: mapState({company: 'company'}),
  data () {
    return {
      projectTypes: [],
      clients: []
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
  methods: {
    logout: function () {
      this.$store.dispatch(AUTH_LOGOUT)
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
h1 {
  font-weight: normal;
}
h3 {
  margin-bottom: 1em;
  font-size: 1.5em;
}
.dashboard-section-container {
  background-color: #f1f1f1;
  border-radius: 1em;
  padding: 2em;
  margin-top: 2em;
}
.dashboard-section {
  background-color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.07) -2px 5px 4px;
  border-radius: 1em;
  padding: 1em;
  transition: .1s;
}
.dashboard-section:hover{
  box-shadow: rgba(0, 0, 0, 0.1) -4px 6px 4px;
}
</style>
