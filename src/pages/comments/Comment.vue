<template>
    <div class="contain">
        <!-- <scroll-view scroll-x class="top">
            <div class="tabbar" :class="{'tabbar-bottom':currentTab==index}" v-for="(item,index) in tabBar" :key="index" @click="clickTab(index)">
                {{item.title}}
            </div>
        </scroll-view>
        <swiper :current="currentTab" @change="changeTab" class="testSwiper">
            <swiper-item>
              <div>
                  <UserTest :usertest='userTest'></UserTest>
              </div>
            </swiper-item>
            <swiper-item>
                <div>
                    <FormerTest :formertest='formerTest'></FormerTest>
                </div>
            </swiper-item>
        </swiper> -->
    </div>
</template>

<script>

import {get, showModal} from '@/util'
import Card from '@/components/Card'


export default {
    components:{
        Card
    },
    data(){
        return {
            currentTab: 0,
            userinfo: '',
            formerTest: [],
            userTest: [],
            tabBar: [
                {title: '我发布的'},
                {title: '以往考试'}
                ]
        }
    },
    methods:{
        changeTab(){
            this.currentTab = !this.currentTab
            console.log(this.currentTab)
        },
        async getUserTest(){
            const userTest = await get('/weapp/getUserTest',{id:this.userinfo.openId})
            this.userTest = userTest.list
        },
        async getUserFormerTest(){
            const formerTest = await get('/weapp/getUserFormerTest',{id:this.userinfo.openId})
            this.formerTest = formerTest.list
        },
        clickTab(e) {
            this.currentTab = e;
        },
        changeTab(e) {
            this.currentTab = e.mp.detail.current;
        }
    },
    mounted(){
        const userinfo = wx.getStorageSync('userinfo')
        if(userinfo){
            this.userinfo = userinfo 
            console.log(this.userinfo)   
        }
        this.getUserTest()
        this.getUserFormerTest()
    },

}
</script>

<style lang="scss">

.testSwiper{
    width: 100%;
    height: 100%;
}

.top {
  width: 100%;
  text-align: center;
  line-height: 42px;
  white-space: nowrap;
  position: relative;
  background: #fff;
}
.tabbar {
  width: 120px;
  font-size: 18px;
  height: 42px;
  display: inline-block;
  color: #000;
}

.tabbar-bottom {
  color: #2196f3;
  border-bottom: 2px solid #2196f3;
}
</style>
