import Vuex from 'vuex'

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setUser(state, user) {
      state.user = user
    },
    clearAuthData(state) {
      state.token = null
      state.user = null
    },
  },
  actions: {
    login({ commit }, authData) {
      commit('setToken', authData.token)
      commit('setUser', authData.user)

      // Lưu token và user vào localStorage
      localStorage.setItem('token', authData.token)
      localStorage.setItem('user', JSON.stringify(authData.user))
    },
    logout({ commit }) {
      commit('clearAuthData')
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token
    },
    getUser(state) {
      if (!state.user) {
        return null
      }
      return state.user
    },
    getRole(state) {
      if (state.user) {
        if (state.user.madocgia) {
          return 'ĐG'
        }
        if (state.user.chucvu) {
          return state.user.chucvu === 'Quản lý' ? 'QL' : 'NV'
        }
      }

      return null
    },
  },
})
