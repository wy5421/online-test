<template>
<div class='swiper'>
    
    <swiper
      :indicator-dots='false'
      :autoplay='true'
      :interval='6000'
      :duration='1000'
      :circular='true'
    >
      <div :key='imgindex' v-for='(box,imgindex) in boxes' @click="functionDetail(box)">
        <swiper-item>
          <img mode='aspectFit' :src="box.url" class="slide-image">
        <div class="author">
            {{box.title}}
        </div>
        <div class="swp-title">
            {{box.intro}}
        </div>
        </swiper-item>
      </div>
    </swiper>
  </div>
</template>

<script>
export default {
  data () {
    return {
      boxes: [
        {url: '/static/img/greatwall.png', title: '发布试题', intro: '点击前往发布你的试题', naviUrl: '/pages/addTest/main'},
        {url: '/static/img/moon.png', title: '个人题库', intro: '点击查看你发布的试题', naviUrl: '/pages/owntest/main'},
        {url: '/static/img/robot.png', title: '历史考试', intro: '点击可以查看你回答过的试题', naviUrl: '/pages/formertest/main'},
        {url: '/static/img/setting.png', title: '使用指南', intro: '欧哈娜的使用手册', naviUrl: '/pages/introduction/main'}
      ]
    }
  },
  methods: {
    functionDetail (item) {
      wx.navigateTo({
        url: item.naviUrl
      })
    }
  }
}
</script>

<style lang='scss' scoped>

.swiper{
    width: 96%;
    margin: 10rpx auto;
    position: relative;

}

.slide-image{
    width: 125rpx;
    height: 125rpx;
    margin-top: 50rpx;
    margin-left: 50rpx;
    border-radius: 50%;
}

.swp-title{
    width: 100%;
    position: absolute;
    left: 35%;
    top: 110rpx;
    font-size: 28rpx;
}

.author{
    position: absolute;
    left: 30%;
    top: 50rpx;
    width: 100%;
    overflow: hidden;
    font-size: 34rpx;
}

</style>
