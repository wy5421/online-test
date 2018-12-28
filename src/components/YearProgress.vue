<template>
    <div class="progress">
        <progress :percent='percent' activeColor='pink' backgroundColor='white'	></progress>
        <p>{{year}}已经过去{{days}}天，过掉{{percent}}%</p>
    </div>
</template>

<script>
export default {
  methods: {
    isLeapYear () {
      const year = new Date().getFullYear()
      if (year % 400 === 0) {
        return true
      } else if (year % 4 === 0 && year % 100 !== 0) {
        return true
      } else {
        return false
      }
    },
    getDayOfYear () {
      return this.isLeapYear() ? 366 : 365
    }
  },
  computed: {
    year () {
      return new Date().getFullYear()
    },
    days () {
      let start = new Date()
      // start 就是今年第一天
      // month设置为0
      start.setMonth(0)
      start.setDate(1)
      let offSet = new Date().getTime() - start.getTime()
      return parseInt(offSet / 1000 / 60 / 60 / 24) + 1
    },
    percent () {
      return (this.days * 100 / this.getDayOfYear()).toFixed(1)
    }
  }

}
</script>

<style lang='scss'>
.progress{
    width: 90%;
    margin: 5% auto;
    progress{
        margin: 20rpx;
        p{
            margin: 5rpx auto;
            color: rgb(248, 157, 45);
        }
    }
}
</style>

