<template>
<div>
    <div class="userInfo">
        <div class="uImg">
            <img src="/static/img/colorful.jpg" class="back">
            <img :src="userDeInfo.user_info.image" class="uImage">
            <div class="ncName">
                {{userDeInfo.user_info.ncName}}
            </div>
            <div class="sign">
                个性签名：{{userDeInfo.signName}}
            </div>
            <div class="localPhone">
                {{userDeInfo.location}}|{{userDeInfo.phone}}
            </div>
        </div>
    </div>
</div>    
</template>

<script>
export default {
    props: ['userDeInfo'],
}
</script>

<style lang="scss" scoped>

.uImg{
    width: 98%;
    margin: 5rpx auto;
    text-align: center;
    color: white;
    font-size: 28rpx;
    position: relative;
}

.back{
    filter: blur(5px);
    width: 100%;
}

.uImage{
    width: 150rpx;
    height: 150rpx;
    border-radius: 50%;
    position: absolute;
    top: 100rpx;
    left: 40%;
}
.ncName{
    position: absolute;
    width: 100%;
    top: 255rpx;

}
.sign{
    position: absolute;
    width: 100%;
    top: 300rpx;

}
.localPhone{
    position: absolute;
    width: 100%;
    top: 350rpx;
}
</style>
