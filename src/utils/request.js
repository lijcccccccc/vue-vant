import axios from 'axios'
import Vue from 'vue'
import store from '../store'
import { Notify } from 'vant'
import { getToken } from '@/utils/auth'

Vue.use(Notify)

const serve = axios.create({
    transformRequest: [
        function(data) {
            let ret = ''
            for (const it in data) {
                if (data[it] === null || data[it] === undefined) {
                    data[it] = ''
                }
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }
    ]
})

serve.interceptors.request.use(
    config => {
        if (store.getters.token) {
            config.headers['juid'] = getToken()
        }

        config.url = 'http://localhost:9528/api/' + config.url
        return config
    },
    error => {
        Promise.reject(error)
    }
)

serve.interceptors.response.use(
    response => {
        if (response.status !== 200) {
            Notify({ type: 'danger', message: response.status })
        }
        return response
    },
    error => {
        return Promise.reject(error)
    }
)

export default serve
