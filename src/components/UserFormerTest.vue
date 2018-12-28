<template>
    <a :href="detailUrl">
    <div class="testList">
        <div class="title">
            标题：{{formertest.title}}
        </div>
        <div class="testInfo">
            <img :src="formertest.user_info.image" class="uImage" mode='aspectFit'>{{formertest.user_info.ncName}}
        </div>
        <div class="tag">
            {{formertest.deptName}}
        </div>
        <div class="countMsg">
            访问:{{formertest.count}}
        </div>
    </div>
    </a>
</template>

<script>
export default {
  props: ['formertest'],
  computed:{
    detailUrl(){
      return '/pages/detail/main?id='+this.formertest.queId
    }
  }
}
</script>

<style lang="scss" scoped>
.testList{
    width: 96%;
    height: 150rpx;
    background-color: rgb(252, 180, 184);
    color: white;
    padding-top: 5rpx;
    margin: 15rpx auto;
    border-radius: 3%;
    position: relative;
}

.title{
    width: 80%;
    overflow: hidden;
    font-size: 42rpx;
    margin-top:20rpx;
    margin-left: 30rpx;
}

.testInfo{
    width: 100%;
    font-size: 28rpx;
    margin-top: 15rpx;
    margin-left: 40rpx;
    .uImage{
        width: 42rpx;
        height: 42rpx;
        border-radius: 50%;
        margin-right: 30rpx;
    }
}

.tag{
    position: absolute;
    width: 10%;
    right: 30rpx;
    top: 20rpx;
    border: 2rpx solid rgb(248, 157, 45);
    text-align: center;
    font-size: 32rpx;
    color: rgb(248, 157, 45);
    border-radius: 15%;
    // float: right;
}

.countMsg{
    position: absolute;
    width: 15%;
    right: 10rpx;
    top: 80rpx;
    text-align: center;
    font-size: 24rpx;
    color: white;
}

</style>
