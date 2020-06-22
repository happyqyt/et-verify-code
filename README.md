# et-verify-code
A vue component for verify code input.

# install
```
npm install et-verify-code -S
```

# use
##### 用法一：
```
// main.js
import EtVerifyCode from 'et-verify-code'
Vue.use(EtVerifyCode)
// demo.js
<template>
  <et-verify-code @sendCodeInput="currentCode" @goNext="submitCode" :length="4" /> <!-- 属性length：验证码位数，不传则默认为4位 -->
</template>
<script>
export default {
  name: 'VcodeTest',
  data () {
    return {
      curCode: ''
    }
  },
  methods: {
    currentCode (val) {
      this.curCode = val
    },
    submitCode () {
      alert('submitCode')
    }
  }
}
</script>
```
##### 用法二：
```
// demo.js
<template>
  <et-verify-code @sendCodeInput="currentCode" @goNext="submitCode" :length="4" /> <!-- 属性length：验证码位数，不传则默认为4位 -->
</template>
<script>
import EtVerifyCode from './components/et-verify-code.vue'
export default {
  name: 'VcodeTest',
  components: {
    EtVerifyCode
  },
  data () {
    return {
      curCode: ''
    }
  },
  methods: {
    currentCode (val) {
      this.curCode = val
    },
    submitCode () {
      alert('submitCode')
    }
  }
}
</script>
```