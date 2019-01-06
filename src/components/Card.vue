<template>
    <a :href="detailUrl">
    <div class="testList">
        <div class="title">
            标题：{{test.title}}
        </div>
        <div class="testInfo">
            <img :src="test.user_info.image" class="uImage" mode='aspectFit'>{{test.user_info.ncName}}
        </div>
        <div class="tag">
            {{test.deptName}}
        </div>
        <div class="countMsg">
            访问:{{test.count}}
        </div>
    </div>
    </a>
</template>

<script>
export default {
  props: ['test'],
  computed: {
    detailUrl () {
      return '/pages/detail/main?id=' + this.test.id
    }
  }
}
</script>

<style lang="scss" scoped>
.testList{
    width: 96%;
    height: 200rpx;
    background-color: rgb(153, 212, 230);
    color: white;
    padding-top: 10rpx;
    margin: 20rpx auto;
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
    // width: 20%;
    padding-left: 5rpx;
    padding-right: 5rpx;
    right: 30rpx;
    top: 20rpx;
    border: 2rpx solid rgb(248, 157, 45);
    text-align: center;
    font-size: 24rpx;
    color: rgb(248, 157, 45);
    border-radius: 2%;
    overflow: hidden;
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
