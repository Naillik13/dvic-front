import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import ClientList from '@/components/client/ClientList'
import store from '../store'
import SignUp from '@/components/SignUp'
import CreateCompany from '@/components/CreateCompany'
import CreateClient from '@/components/client/CreateClient'
import CreateProjectType from '@/components/project/CreateProjectType'
import CreateProject from '@/components/project/CreateProject'
import ProjectList from '@/components/project/ProjectList'

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
    console.log(localStorage.getItem('company'))
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
      component: ClientList,
      beforeEnter: ifAuthenticatedAndCompanyExist
    },
    {
      path: '/create-client',
      name: 'CreateClient',
      component: CreateClient,
      beforeEnter: ifAuthenticatedAndCompanyExist
    },
    {
      path: '/create-project-type',
      name: 'CreateProjectType',
      component: CreateProjectType,
      beforeEnter: ifAuthenticatedAndCompanyExist
    },
    {
      path: '/create-project',
      name: 'CreateProject',
      component: CreateProject,
      beforeEnter: ifAuthenticatedAndCompanyExist
    },
    {
      path: '/projects',
      name: 'ProjectList',
      component: ProjectList,
      beforeEnter: ifAuthenticatedAndCompanyExist
    }
  ]
})
