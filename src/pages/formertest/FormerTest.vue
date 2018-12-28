<template>
    <div>
        <UserFormerTest :key="formertest.id" v-for="formertest in formertest" :formertest="formertest"></UserFormerTest>
    </div>
</template>

<script>
import {get} from '@/util'
import UserFormerTest from '@/components/UserFormerTest'

export default {
  components: {
    UserFormerTest
  },
  data () {
    return {
      userinfo: '',
      formertest: {}
    }
  },
  methods: {
    async getUserAllFtest () {
      const formertest = await get('/weapp/getUserAllFtest', {id: this.userinfo.openId})
      this.formertest = formertest.list
    }
  },
  onPullDownRefresh () {
    wx.showNavigationBarLoading()
    console.log('下拉')
    this.getUserAllFtest()
    wx.stopPullDownRefresh()
    wx.hideNavigationBarLoading()
  },
  mounted () {
    const userinfo = wx.getStorageSync('userinfo')
    if (userinfo) {
      this.userinfo = userinfo
    }
    this.getUserAllFtest()
  }
}
</script>

<style>

</style>
