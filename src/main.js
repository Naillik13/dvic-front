// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import {faUsersCog, faUserPlus, faUsers, faFileExport, faCheck, faTimes, faProjectDiagram, faBriefcase, faTasks, faNetworkWired} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {HTTP} from './common/http-common'

library.add(faUsersCog)
library.add(faUserPlus)
library.add(faUsers)
library.add(faFileExport)
library.add(faCheck)
library.add(faTimes)
library.add(faProjectDiagram)
library.add(faBriefcase)
library.add(faTasks)
library.add(faNetworkWired)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

const token = localStorage.getItem('user-token')

if (token) {
  HTTP.defaults.headers.common['Authorization'] = 'Bearer ' + token
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
