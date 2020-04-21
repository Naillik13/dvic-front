import { COMPANY_USER_REQUEST, COMPANY_REQUEST, COMPANY_ERROR, COMPANY_SUCCESS } from '../actions/company'
import Vue from 'vue'
import { AUTH_LOGOUT } from '../actions/auth'
import {HTTP} from '../../common/http-common'

const state = { status: '', company: {} }

const getters = {
  getCompany: state => state.company,
  isCompanyLoaded: state => !!state.company.name
}

const actions = {
  [COMPANY_USER_REQUEST]: ({ commit, dispatch }, userId) => {
    return new Promise((resolve, reject) => {
      commit(COMPANY_USER_REQUEST)
      HTTP.get('users/' + userId + '/company')
        .then(resp => {
          commit(COMPANY_SUCCESS, resp.data)
          resolve(resp)
        })
        .catch((err) => {
          commit(COMPANY_ERROR)
          dispatch(AUTH_LOGOUT)
          reject(err)
        })
    })
  },
  [COMPANY_REQUEST]: ({ commit, dispatch }, company) => {
    return new Promise((resolve, reject) => {
      commit(COMPANY_REQUEST)
      HTTP.post('companies', company).then(resp => {
        commit(COMPANY_SUCCESS, resp.data)
        resolve(resp)
      }).catch((err) => {
        commit(COMPANY_ERROR)
        dispatch(AUTH_LOGOUT)
        reject(err)
      })
    })
  }
}

const mutations = {
  [COMPANY_USER_REQUEST]: state => {
    state.status = 'loading'
  },
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
