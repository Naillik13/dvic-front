/* eslint-disable promise/param-names */
import {
  AUTH_REQUEST,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_LOGOUT
} from '../actions/auth'
import {COMPANY_USER_REQUEST} from '../actions/company'
import {HTTP} from '../../common/http-common'

const state = {
  userId: localStorage.getItem('user-id') || '',
  token: localStorage.getItem('user-token') || '',
  status: '',
  hasLoadedOnce: false
}

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status
}

const actions = {
  [AUTH_REQUEST]: ({ commit, dispatch }, user) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST)
      HTTP.post('auth', user)
        .then(resp => {
          const token = resp.data.token
          const userId = resp.data.userId
          localStorage.setItem('user-token', token)
          localStorage.setItem('user-id', userId)
          HTTP.defaults.headers.common['Authorization'] = 'Bearer ' + token
          commit(AUTH_SUCCESS, token, userId)
          dispatch(COMPANY_USER_REQUEST, userId)
          resolve(userId)
        })
        .catch(err => {
          commit(AUTH_ERROR, err)
          localStorage.removeItem('user-token')
          reject(err)
        })
    })
  },
  [AUTH_LOGOUT]: ({ commit }) => {
    return new Promise(resolve => {
      commit(AUTH_LOGOUT)
      localStorage.removeItem('user-token')
      resolve()
    })
  }
}

const mutations = {
  [AUTH_REQUEST]: state => {
    state.status = 'loading'
  },
  [AUTH_SUCCESS]: (state, token, userId) => {
    state.status = 'success'
    state.token = token
    state.userId = userId
    state.hasLoadedOnce = true
  },
  [AUTH_ERROR]: state => {
    state.status = 'error'
    state.hasLoadedOnce = true
  },
  [AUTH_LOGOUT]: state => {
    state.token = ''
    state.userId = ''
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
