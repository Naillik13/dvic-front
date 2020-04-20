import { COMPANY_REQUEST, COMPANY_ERROR, COMPANY_SUCCESS } from '../actions/company'
import Vue from 'vue'
import { AUTH_LOGOUT } from '../actions/auth'
import {HTTP} from '../../common/http-common'

const state = { status: '', company: {} }

const getters = {
  getCompany: state => state.company,
  isCompanyLoaded: state => !!state.company.name
}

const actions = {
  [COMPANY_REQUEST]: ({ commit, dispatch }, userId) => {
    commit(COMPANY_REQUEST)
    console.log(HTTP.defaults.headers)
    HTTP.get('users/' + userId + '/company')
      .then(resp => {
        console.log(resp)
        commit(COMPANY_SUCCESS, resp.data.company)
      })
      .catch(() => {
        commit(COMPANY_ERROR)
        dispatch(AUTH_LOGOUT)
      })
  }
}

const mutations = {
  [COMPANY_REQUEST]: state => {
    state.status = 'loading'
  },
  [COMPANY_SUCCESS]: (state, company) => {
    state.status = 'success'
    Vue.set(state, 'company', company)
  },
  [COMPANY_ERROR]: state => {
    state.status = 'error'
  },
  [AUTH_LOGOUT]: state => {
    state.company = {}
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
