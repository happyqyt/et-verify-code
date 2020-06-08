import EtVerifyCode from './et-verify-code.vue'

const components = [
  EtVerifyCode
]

const install = function (Vue) {
  if (install.installed) return
  components.map(comp => Vue.component(comp.name, comp))
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  EtVerifyCode
}
