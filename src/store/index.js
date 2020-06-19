import Vue from 'vue'
import Vuex from 'vuex'
import User from './modules/user'
Vue.use(Vuex)

const modules = Object.assign({}, {
  User
})

export default new Vuex.Store({
  modules: modules
})
