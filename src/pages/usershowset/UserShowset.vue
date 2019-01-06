<template>
    <div class="info">
        <div :key="userInfo" v-for="userInfo in userDeInfo" :userInfo="userInfo">
        <div class="uImg">
            <img :src="userInfo.user_info.image" class="back" mode='aspectFill'>
            <img :src="userInfo.user_info.image" class="img" mode='aspectFill'>
        </div>
        <div class="ncName">
            <p>{{userInfo.user_info.ncName}}</p>
        </div>
        <div class="sign">
            <input type="text" :value="userInfo.signName" v-model="sign">
        </div>
        <div class="phone">
            手机型号：
            <switch :checked='phone' @change="getPhone" class="switchBar"></switch>
            <span class="text-switch">{{phone}}</span>
        </div>
        <div class="location">
            地理位置：
            <switch :checked='location' @change="getLocation" class="switchBar"></switch>
            <span class="text-switch">{{location}}</span>
        </div>
        </div>
        <div class="btnAre">
            <button class="btn" @click="updateDeInfo">保存</button>
        </div>
    </div>
</template>

<script>

import {post} from '@/util'

export default {
    data(){
        return {
            userinfo: '',
            userDeInfo: [],
            phone: '',
            location: '',
        }
    },
    methods:{
        async getUserDeInfo(){
            const userDeInfo = await post('/weapp/getUserDeInfo',{openId:this.userinfo.openId})
            this.userDeInfo = userDeInfo.list
            console.log(userDeInfo)           
        },
        async updateDeInfo(){
            const data = {
                openId: this.userinfo.openId,
                signName: this.sign,
                phone: this.phone,
                location: this.location
            }
            await post('/weapp/updateDeInfo', data)
        },
        getPhone(e){
            if(e.target.value){
                const phoneInfo = wx.getSystemInfoSync()
                console.log(phoneInfo)
                this.phone = phoneInfo.model
            }else{
                this.phone = ''
                //未选中
            }
        },
        getLocation(e){
            //RtMQsFIuGmyWZ3iSFX8KRHeb6IpW07UO
            let url = 'http://api.map.baidu.com/geocoder/v2/'
            const ak = 'RtMQsFIuGmyWZ3iSFX8KRHeb6IpW07UO'
            if(e.target.value){
                wx.getLocation({
                    success: loc=>{
                        wx.request({
                            url,
                            data:{
                                location:`${loc.latitude},${loc.longitude}`,
                                output:'json',
                                ak,
                            },
                            success:res=>{
                                console.log(res)
                                if(res.data.status==0){
                                    this.location = res.data.result.addressComponent.city
                                }else{
                                    this.location = '未知地点'
                                }
                            }
                        })
                        console.log(loc)
                    }
                })
            }else{
                this.location = ''
            }
        }
    },
    mounted(){
        const userinfo = wx.getStorageSync('userinfo')
        if(userinfo){
            this.userinfo = userinfo
        }
        this.getUserDeInfo()
        console.log(userinfo)
    }
}
</script>

<style lang="scss" scoped>
.uImg{
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
.ncName{
    width: 100%;
    text-align: center;
    position: absolute;
    color: white;
    left: 0;
    top: 300rpx;
}

.phone{
    width: 90%;
    margin: 20rpx 30rpx;
    font-size: 28rpx;
    color: rgb(238, 128, 128);
}
.switchBar{
    margin: 20rpx 30rpx;
    height: 40rpx;
}
.location{
    width: 90%;
    margin: 20rpx 30rpx;
    font-size: 28rpx;
    color: rgb(238, 128, 128);    
}
.btnAre{
    width: 90%;
    margin: 20rpx auto;
}
.btn{
    height: 100rpx;
    margin: 20rpx auto;
    color: white;
    background-color: rgb(34, 138, 34);
}

.btn:active{
    background-color: rgb(17, 66, 17);
}
</style>
