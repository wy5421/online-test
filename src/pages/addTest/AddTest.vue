<template>
    <div >
        <input v-model='title' class='textArea' :maxlength='100' placeholder='这里输入题目'>
        <input v-model='choiceA' class='textArea' :maxlength='100' placeholder='设置选项A'>
        <input v-model='choiceB' class='textArea' :maxlength='100' placeholder='设置选项B'>
        <input v-model='choiceC' class='textArea' :maxlength='100' placeholder='设置选项C'>
        <input v-model='choiceD' class='textArea' :maxlength='100' placeholder='设置选项D'>
        <input v-model='answer' class='textArea' :maxlength='100' placeholder='正确选项(A~D)'>
        <input v-model='dept' class='textArea' :maxlength='100' placeholder='输入代号(1~4)'>
        <P  v-for="(deptInfo, index) in deptInfo" :key="deptInfo.id" class="choice">{{index+1}}:{{deptInfo.deptName}}</P>
        <!-- <picker @change="pickerChange" :value="index" :range="deptInfo.list" :rang-key='deptInfo.deptName'>
            <img src='../../../static/img/plus.png' mode='widthFix'>
        </picker> -->
        <button @click="addTest" class="btn">发布</button>
        
    </div>
</template>

<script>
import {get, post, showModal} from '@/util'

export default {
  data () {
    return {
      userinfo: '',
      comment: '',
      choiceA: '',
      choiceB: '',
      choiceC: '',
      choiceD: '',
      answer: '',
      deptInfo: [],
      deptinfo: []
    }
  },
  methods: {
    async addTest () {
      const data = {
        title: this.title,
        choiceA: this.choiceA,
        choiceB: this.choiceB,
        choiceC: this.choiceC,
        choiceD: this.choiceD,
        answer: this.answer,
        deptId: this.dept,
        openId: this.userinfo.openId
      }
      try {
        await post('/weapp/addTest', data)
        wx.switchTab({
          url: '/pages/tests/main'
        })
      } catch (e) {
        showModal('失败', e.msg)
      }
      console.log(data)
      this.title = ''
      this.choiceA = ''
      this.choiceB = ''
      this.choiceC = ''
      this.choiceD = ''
      this.answer = ''
      this.dept = ''
    },
    async getDepts () {
      const deptInfo = await get('/weapp/getDepts', '')
      console.log(deptInfo)
      this.deptInfo = deptInfo
      console.log(this.deptInfo)
    },
    pickerChange () {

    }

  },
  mounted () {
    const userinfo = wx.getStorageSync('userinfo')
    if (userinfo) {
      this.userinfo = userinfo
    }
    this.getDepts()
  }
  // computed: {
  //     deptInfo(){
  //         return this.getDepts()
  //     }
  // }

}
</script>

<style lang="scss" scoped>
.textArea{
    width: 96%;
    height: 36rpx;
    margin: 20rpx auto;
    font-size: 32rpx;
    background-color: rgb(253, 249, 196);
}
.choice{
    width: 95%;
    font-size: 28rpx;
    margin: 20rpx auto;
}
.btn{
    width: 95%;
    height: 100rpx;
    margin: 10rpx auto;
    color: white;
    background-color: rgb(34, 138, 34);
}

.btn:active{
    background-color: rgb(17, 66, 17);
}
</style>
