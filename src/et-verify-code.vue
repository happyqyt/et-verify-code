<template>
  <div class="flex">
    <template v-for="n in len">
      <input :key="'codeInput' + n" :ref="'codeInput' + n" class="mr-6 text-center" style="width: 40px;" v-model.trim.number="code[n-1]" @keydown.native="onkeydown(n)" @keyup.native="onkeyup(n)" />
    </template>
    <div class="flex-1"></div>
    <button type="primary" @click="sendCode" class="sendCodeBtn font-normal" :underline="false">Resend Email</button>
  </div>
</template>

<script>
export default {
  name: 'et-verify-code',
  props: ["length"],
  data () {
    return {
      len: this.length || 4, // 验证码长度
      code: new Array(this.len),
      keyCodes: [
        48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, // 数字
        8, // backspace
        // 37, 39, // arrowLeft, arrowRight
        13 // enter
      ]
    }
  },
  methods: {
    sendCode () {
      this.$emit('sendCode')
    },
    sendCodeStart () {
      this.code = new Array(this.len)
      this.$emit('sendCodeInput', '')
      this.autoFocus()
    },
    sendCodeClear () {
      this.code = new Array(this.len)
    },
    autoFocus () {
      this.$refs.codeInput1[0].focus()
    },
    onkeydown (n) {
      // eslint-disable-next-line
      // console.log(event)
      if (!this.keyCodes.includes(event.keyCode)) { // 拦截keyCodes数组外的键盘输入
        event.returnValue = false
      // } else if (this.code[n - 1] !== '' && this.code[n - 1] !== undefined) {
      //   this.$set(this.code, n - 1, '')
      } else if (event.keyCode === 8 && n > 1 && this.code[n - 1] === '') { // 删除键且this.code[n-1]为空
        this.$refs['codeInput' + (n - 1)][0].focus()
        event.returnValue = false
      }
    },
    onkeyup (n) {
      if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) { // 数字键
        this.$set(this.code, n - 1, event.key)
        if (n < this.len) this.$refs['codeInput' + (n + 1)][0].focus()

        let codeStr = this.code.join('')
        if (codeStr.length === this.len) this.$emit('sendCodeInput', codeStr)
      } else if (event.keyCode === 8) { // 删除键
        if (this.code.join('').length < this.len) this.$emit('sendCodeInput', '')
        // if (n > 1) this.$refs['codeInput' + (n - 1)][0].focus()
      } else if (event.keyCode === 13) { // enter键
        if (this.code.join('').length === this.len) this.$emit('goNext')
      }
    }
  }
}
</script>

<style lang="stylus">

</style>
