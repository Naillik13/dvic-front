<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="container">
      <div class="row">
        <div class="col-lg-6 col-sm-12">
          <div class="row dashboard-section-container">
            <h3 class="col-12 d-flex justify-content-between">Gérer les clients<font-awesome-icon icon="users-cog" /></h3>
            <router-link class="col-4" to="/clients">
              <div class="dashboard-section">
                <font-awesome-icon icon="users" />
                <div>Liste des clients</div>
              </div>
            </router-link>
            <router-link class="col-4"  to="/clients">
              <div class="dashboard-section">
                <font-awesome-icon icon="user-plus" />
                <div>Ajouter un client</div>
              </div>
            </router-link>
            <router-link class="col-4"  to="/clients">
              <div class="dashboard-section">
                <font-awesome-icon icon="file-export" />
                <div>Exporter les clients</div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data () {
    return {
      msg: 'Welcome to DVIC dashboard'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-weight: normal;
}
h3 {
  margin-bottom: 1em;
  font-size: 1.5em;
}
a {
  color: #42b983;
}
a:hover {
  text-decoration: none;
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
