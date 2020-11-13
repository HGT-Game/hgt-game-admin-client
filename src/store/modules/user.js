import { loginByPassword, logout, getInfo, loginByCode } from '@/api/user/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { account, password, code, loginType } = userInfo
    return new Promise((resolve, reject) => {
      if (loginType === 'byPassword') {
        loginByPassword({ account: account.trim(), password: password }).then(response => {
          const { data } = response
          commit('SET_TOKEN', data.accessToken)
          commit('SET_NAME', data.userInfo.username)
          commit('SET_AVATAR', data.userInfo.avatar)
          setToken(data.accessToken)
          resolve()
        }).catch(error => {
          reject(error)
        })
      } else if (loginType === 'byCode') {
        loginByCode({ account: account.trim(), code: code }).then(response => {
          const { data } = response
          commit('SET_TOKEN', data.accessToken)
          commit('SET_NAME', data.userInfo.username)
          commit('SET_AVATAR', data.userInfo.avatar)
          setToken(data.accessToken)
          resolve()
        }).catch(error => {
          reject(error)
        })
      }
    })
  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        const { username, avatar } = data
        commit('SET_NAME', username)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

