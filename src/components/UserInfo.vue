<template>
    <div>
    <div class="userList" :key="index" v-for="(admin,index) in admins">
        <div class="userInfo" >
            <div class="pic">
                <img :src="admin.user_info.image" class="uImage" mode='aspectFit'>
            </div>
            <div class="aName">
                {{admin.user_info.ncName}}
            </div>
        </div>
    </div>
    </div>
</template>

<script>
export default {
    props: ['admins'],
}
</script>

<style lang="scss" scoped>
.userList{
    width: 96%;
    height: 120rpx;
    background-color: rgb(153, 212, 230);
    color: white;
    padding-top: 10rpx;
    margin: 20rpx auto;
    border-radius: 1%;
}
.userInfo{
    width: 100%;
    font-size: 34rpx;
    margin-top: 15rpx;
    margin-left: 40rpx;
    position: relative;
    .uImage{
        width: 75rpx;
        height: 75rpx;
        border-radius: 50%;
        margin-right: 30rpx;
    }
}
.pic{
    position: absolute;
    left: 2%;
    top: 5%;
}
.aName{
    position: absolute;
    padding-top: 20rpx;
    left: 20%;
    top: 30%;
}
</style>
