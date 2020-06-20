import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import getters from './getters'
Vue.use(Vuex)

const modules = Object.assign({}, {
  user
})

export default new Vuex.Store({
  modules: modules,
  getters
})
