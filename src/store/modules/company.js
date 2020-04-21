import { COMPANY_USER_REQUEST, COMPANY_REQUEST, COMPANY_ERROR, COMPANY_SUCCESS } from '../actions/company'
import { AUTH_LOGOUT } from '../actions/auth'
import {HTTP} from '../../common/http-common'

const state = {
  status: '',
  companyId: localStorage.getItem('company-id') || '',
  companyName: localStorage.getItem('company-name') || ''
}

const getters = {
  getCompany: state => state.company,
  isCompanyLoaded: state => !!state.companyId
}

const actions = {
  [COMPANY_USER_REQUEST]: ({ commit, dispatch }, userId) => {
    return new Promise((resolve, reject) => {
      commit(COMPANY_USER_REQUEST)
      HTTP.get('users/' + userId + '/company')
        .then(resp => {
          localStorage.setItem('company-id', resp.data._id)
          localStorage.setItem('company-name', resp.data.name)
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
        localStorage.setItem('company-id', resp.data._id)
        localStorage.setItem('company-name', resp.data.name)
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
    state.companyId = company._id
    state.companyName = company.name
  },
  [COMPANY_ERROR]: state => {
    state.status = 'error'
  },
  [AUTH_LOGOUT]: state => {
    state.companyId = ''
    state.companyName = ''
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
