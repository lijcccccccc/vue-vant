import Vue from 'vue'
import { login } from '@/api/login.js'

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
        const { username, password, phonenum, num, type } = userInfo
        return new Promise((resolve, reject) => {
            if (type === 1) {
                login({ username, password, num, type }).then(res => {
                    commit('SET_TOKEN', res.data.token)
                    return resolve()
                }).catch(() => {
                    return reject()
                })

            } else if (type === 2) {
                login({ type, phonenum }).then(res => {
                    commit('SET_TOKEN', res.data.token)
                    return resolve()
                }).catch(() => {
                    return reject()
                })
            }
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