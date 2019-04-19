/*
所有路由的数组
 */
import About from '../pages/About.vue'
import Home from '../pages/Home.vue'
import News from '../pages/News.vue'
import Message from '../pages/Message.vue'
import MessageDetail from '../pages/MessageDetail.vue'

export default [
  {
    path: '/about',
    component: About
  },
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: '/home/news',
        component: News
      },
      {
        path: 'message',
        component: Message,
        children: [
          {
            path: '/home/message/detail/:id',
            component: MessageDetail
          }
        ]
      },
      {
        path: '',
        redirect: '/home/news'
      }
    ]
  },
  {  // 当请求项目根路径时, 自动跳转到about
    path: '/',
    redirect: '/about'
  }
]