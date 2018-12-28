<template>
<div class="testInfo">
        <div class="thumb">
        <img class="back" 
            :src="userinfo.avatarUrl" 
            mode='aspectFill'>
        <img class="img" 
             :src="userinfo.avatarUrl"
             mode="aspectFit">
             <p class="uName">
                {{userinfo.nickName}}
            </p>
        </div>
        <div class="textBody">
            <p class="artTitle">Hi,{{userinfo.nickName}}:</p>
            <div class="article">
                欢迎使用小程序欧哈娜，在夏威夷语里，欧哈娜是家人的意思。
                在这个小程序中，你可以设计一个问题，设置选项，然后分享给朋友们或其他使用者，等待他们前来回答。
                在首页我们会根据浏览量进行排名展示，前五位将会循环展示。在个人页面你可以管理自己的题库，在个人信息页面你可以找到发布试题的入口。
            </div>
            <div class="artEnd">
                希望你和欧哈娜都能学到新的知识。
            </div>
            <div class="artEnd">
                留言的是：Chengzi.
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      userinfo: ''
    }
  },
  mounted () {
    const userinfo = wx.getStorageSync('userinfo')
    if (userinfo) {
      this.userinfo = userinfo
    }
  }
}
</script>

<style lang='scss' scoped>
.testInfo{
    width: 100%;
    .thumb{
    width: 750rpx;
    height: 500rpx;
    overflow: hidden;
    position: relative;
    .back{
        filter: blur(10px);
        width: 100%;
        z-index: 1;
    }
    .img{
        position: absolute;
        width: 150rpx;
        height: 150rpx;
        left: 40%;
        top: 100rpx;
        border-radius: 50%;
    }
    }
}
.uName{
    position: absolute;
    width: 100%;
    text-align: center;
    color: white;
    left: 0;
    top: 300rpx;
}

.textBody{
    width: 98%;
    height: 500rpx;
    margin: 1% auto;
    flex-wrap: wrap;
}
.artTitle{
    width: 90%;
    margin: 20rpx;
    font-size: 34rpx;
}
.article{
    width: 90%;
    height: 250rpx;
    line-height: 42rpx;
    margin: 10rpx auto;
    font-size: 28rpx;

}
.artEnd{
    width: 98%;
    height: 42rpx;
    margin: 10rpx 60rpx;
    font-size: 28rpx;
}
</style>
