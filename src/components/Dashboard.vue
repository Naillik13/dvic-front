<template>
  <div class="hello text-center">
    <h1>Welcome to {{ company.companyName }} dashboard</h1>
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
            <router-link class="col-4" to="/clients">
              <div class="dashboard-section">
                <font-awesome-icon icon="project-diagram" />
                <div>Liste des projets</div>
              </div>
            </router-link>
            <router-link class="col-4"  to="/create-client">
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

export default {
  name: 'Dashboard',
  computed: mapState({company: 'company'})
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
