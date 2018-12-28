<template>
<div class='swiper'>
    
    <swiper
      :indicator-dots='true'
      indicator-color='#C3C1C6'
      :indicator-active-color = 'blue'
      :autoplay='true'
      :interval='6000'
      :duration='1000'
      :circular='true'
    >
      <div :key='imgindex' v-for='(top,imgindex) in tops' @click="testDetail(top)">
        <swiper-item>
          <img mode='aspectFit' :src="top.user_info.image" class="slide-image">
        <div class="author">
            {{top.user_info.ncName}}
        </div>
        <div class="swp-title">
            {{top.title}}
        </div>
        </swiper-item>
      </div>
    </swiper>
  </div>
</template>

<script>
export default {
  props: ['tops'],
  methods: {
    testDetail (item) {
      wx.navigateTo({
        url: '/pages/detail/main?id=' + item.id
      })
    }
  }
}
</script>

<style lang='scss' scoped>

.swiper{
    width: 98%;
    margin: 10rpx auto;
    position: relative;
    background-color: rgb(228, 244, 248);
}

.slide-image{
    width: 150rpx;
    height: 150rpx;
    margin-top: 50rpx;
    margin-left: 30rpx;
    border-radius: 50%;
}

.swp-title{
    width: 100%;
    position: absolute;
    left: 30%;
    top: 60rpx;
}

.author{
    position: absolute;
    left: 30%;
    top: 130rpx;
    width: 100%;
    overflow: hidden;
    font-size: 32rpx;
}

</style>
