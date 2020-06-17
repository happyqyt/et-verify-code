<template>
  <div class="vcWrap">
    <input v-for="n in len" :key="'codeInput' + n" :ref="'codeInput' + n" v-model.trim.number="code[n-1]" @keydown="onkeydown(n)" @keyup="onkeyup(n)" />
  </div>
</template>

<script>
export default {
  name: 'EtVerifyCode',
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
    onkeydown (n) {
      // eslint-disable-next-line
      // console.log(event)
      if (!this.keyCodes.includes(event.keyCode)) { // 拦截keyCodes数组外的键盘输入
        event.returnValue = false
      } else if (event.keyCode === 8 && n > 1 && this.code[n - 1] === '') { // 删除键且this.code[n-1]为空
        this.$refs['codeInput' + (n - 1)][0].focus()
        event.returnValue = false
      }
    },
    onkeyup (n) {
      if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) { // 数字键
        this.$set(this.code, n - 1, event.key)
        if (n < this.len) this.$refs['codeInput' + (n + 1)][0].focus()

        this.$emit('sendCodeInput', this.code.join(''))
      } else if (event.keyCode === 8) { // 删除键
        this.$emit('sendCodeInput', this.code.join(''))
      } else if (event.keyCode === 13) { // enter键
        if (this.code.join('').length === this.len) this.$emit('goNext')
      }
    }
  }
}
</script>

<style lang="stylus">
.vcWrap
  input
    width 40px
    height 40px
    line-height: 40px

    -webkit-appearance: none;
    // background-color: #fff;
    // background-image: none;
    // border: 1px solid #dcdfe6;
    background-color: #f7f9fa;
    border: 1px solid #f7f9fa;

    box-sizing: border-box;
    display: inline-block;
    font-size: inherit;
    outline: 0;
    padding: 0 14px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    border-radius: 4px;

    margin-right 1em
    &:last-child
      margin-right 0

</style>
