import Vue from 'vue'
import Test from './Test'

const app = new Vue(Test)
app.$mount()

export default{
    config: {
        enablePullDownRefresh:true
    }
}