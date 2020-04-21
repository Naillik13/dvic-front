import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import ClientList from '@/components/client/ClientList'
import store from '../store'
import SignUp from '../components/SignUp'
import CreateCompany from '../components/CreateCompany'

Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/login')
}

const ifAuthenticatedAndCompanyExist = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    if (store.getters.isCompanyLoaded) {
      next()
      return
    }
    next('/create-company')
    return
  }
  next('/login')
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      beforeEnter: ifAuthenticatedAndCompanyExist
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/create-company',
      name: 'CreateCompany',
      component: CreateCompany,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/clients',
      name: 'ClientList',
      component: ClientList
    }
  ]
})
