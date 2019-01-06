import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
// App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  config: {
    'pages': ['^pages/comments/main'],
    'window': {
      'navigationBarBackgroundColor': '#ffffff',
      'navigationBarTextStyle': 'black',
      'navigationBarTitleText': '欧哈娜',
      'backgroundColor': '#eeeeee',
      'backgroundTextStyle': 'light'
    },
    'tabBar': {
      'selectedColor': 'blue',
      'list': [{
        'pagePath': 'pages/usertest/main',
        'text': '评论',
        'iconPath': 'static/img/index1.png',
        'selectedIconPath': 'static/img/index2.png'
      },
      {
        'pagePath': 'pages/tests/main',
        'text': '考试',
        'iconPath': 'static/img/todo.png',
        'selectedIconPath': 'static/img/todo-active.png'
      },
      {
        'pagePath': 'pages/me/main',
        'text': '展示',
        'iconPath': 'static/img/user1.png',
        'selectedIconPath': 'static/img/user2.png'
      },
      {
        'pagePath': 'pages/me/main',
        'text': '用户',
        'iconPath': 'static/img/user1.png',
        'selectedIconPath': 'static/img/user2.png'
      }
      ]
    }
  }
}
