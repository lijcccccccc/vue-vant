import Vue from 'vue'

const state = {
    token: '',
    name: '',
    login: '',
    roles: []
}

const mutations = {
    SET_TOKEN: (state, token) => {
        Vue.set(state, 'token', token)
    }
}

const actions = {
    login({ commit }, userInfo) {
        const { username, password } = userInfo
        return new Promise((resolve) => {
            commit('SET_TOKEN', '12312313')
            return resolve()
        })
    },
    logout() {
        return new Promise((resolve) => {
            this.removeToken()
            resolve()
        })
    },
    removeToken({ commit }) {
        commit('SET_TOKEN', '')
    }
}

export default {
    state,
    mutations,
    actions
}