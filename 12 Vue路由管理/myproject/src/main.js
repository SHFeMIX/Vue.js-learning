import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

import Demo1 from './components/Demo1.vue'
import Demo2 from './components/Demo2.vue'
import User from './components/User.vue'
import UserSetting from './components/UserSetting.vue'
import Category from './components/Category.vue'
import Friends from './components/Friends.vue'

const app = createApp(App)

// 定义路由
const routes = [
    { path: '/demo1', component: Demo1 },
    { path: '/demo2', component: Demo2 },
    // 动态参数路由
    { 
        path: '/user/:username', 
        // 命名路由
        name: 'user',
        component: User,
        // 嵌套路由
        children: [
            { path: 'friends/:count', component: Friends}
        ],
    },
    // 正则匹配路由
    { 
        path: '/user/:id(\\d+)', 
        component: UserSetting,  
        // 别名, 可以用来简化多级嵌套路由的路径
        alias: '/setting/:id(\\d+)', // 也可以是字符串，配置多个别名
        // path有的参数，alias也必须有

        // 路由传参
        props: true // 会把路由参数作为props传递给组件

        // props: { // 也可以是对象，配置多个参数, 如果参数与路由本身没有直接关系就这么写死
        //     id: 123,
        //     name: 'abc'
        // }

        // props: route => {
        //     // 也可以是函数，根据路由参数动态返回props
        //     const { id } = route.params
        //     return { id }
        //     // 应用场景：路由参数与组件props有直接关系，但是路由参数名与组件props名不一致
        //        或者将静态值与路由参数结合
        // }
    },
    // 多级匹配路由
    { path: '/category/:cat*', component: Category },
    // 命名视图
    { 
        path: '/home/:username/:id',
        components: {
            default: User,
            main: UserSetting
        },
        // 命名视图传参
        // 需要对每个视图的props单独设置
        props: { default: true, main: true }
    },
    // 重定向
    // 与别名的区别在于会改变url
    { path: '/null', redirect: '/demo1' },
]

// 创建路由实例
const router = createRouter({
    history: createWebHistory(),
    routes
})

// 注册路由
app.use(router)

app.mount('#app')