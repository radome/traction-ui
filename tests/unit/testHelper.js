import BootstrapVue from 'bootstrap-vue'
import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import store from '@/store'

const localVue = createLocalVue()
localVue.use(BootstrapVue)
localVue.use(VueRouter)

export { mount, localVue, store }
