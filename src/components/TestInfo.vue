<template>
    <div class="testInfo">
        <div class="thumb">
        <img class="back" 
            :src="test.user_info.image" 
            mode='aspectFill'>
        <img class="img" 
             :src="test.user_info.image"
             mode="aspectFit">
             <p class="uName">
                {{test.user_info.ncName}}
            </p>
        </div>
        <div class="tag">
            {{test.deptName}}
        </div>
        <div class="title">
            {{test.title}}
        </div>
        <div class="choice">
            A.{{test.choiceA}}
        </div>
        <div class="choice">
            B.{{test.choiceB}}
        </div>
        <div class="choice">
            C.{{test.choiceC}}
        </div>
        <div class="choice">
            D.{{test.choiceD}}
        </div>
    </div>
</template>

<script>
export default {
    props:['test']    
}
</script>

<style lang="scss" scoped>
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
.tag{
    margin: 30rpx;
    width: 70rpx;
    font-size: 24rpx;
    height: 40rpx;
    text-align: center;
    color: red;
    border: 2rpx solid red;
    border-radius: 10%;
}

.title{
    width: 100%;
    margin: 20rpx 30rpx;
}
.choice{
    width: 100%;
    margin-top: 20rpx;
    margin-left: 60rpx;
}
</style>
