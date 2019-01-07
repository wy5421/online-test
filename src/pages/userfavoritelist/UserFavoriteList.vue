<template>
    <div>
        <FavoriteCard :key="favoriteTest.id" v-for="favoriteTest in userFavoriteTests" :favoriteTest='favoriteTest'></FavoriteCard>
    </div>
</template>

<script>

import {get} from '@/util'
import FavoriteCard from '@/components/FavoriteCard'

export default {
    components:{
        FavoriteCard,
    },
    data(){
        return {
            userinfo: '',
            userFavoriteTests: []
        }
    },
    methods:{
        async getUserAllFavorite(){
            const userFavoriteTests = await get('/weapp/getUserAllFavorite', {openId:this.userinfo.openId})
            this.userFavoriteTests = userFavoriteTests.list
        }
    },
    mounted(){
        const userinfo = wx.getStorageSync('userinfo')
        if(userinfo){
            this.userinfo = userinfo
        }
        this.getUserAllFavorite()
    },
}
</script>

<style lang="scss" scoped>

</style>
