<template>
    <h1>Hello World</h1>
    <p>
        <!-- route-link是路由跳转组件，用to来制定要跳转的路由 -->
        <router-link to="/demo1">页面1</router-link>
        <router-link to="/demo2">页面2</router-link>
        <router-link to="/user/小王">小王</router-link>
        <router-link to="/user/2">用户2设置</router-link>
    </p>
    <p>
        <button @click="$router.push('/user/小红')">用户中心小红</button>
        <button @click="$router.push({ name: 'user', params: { username: '小蓝' }, query: { param1: 1, param2: 2 } })">用户中心小蓝</button>
    </p>

    <!-- router-view是路由页面的出口，路由匹配到的组件会渲染在此 -->
    <router-view></router-view>
    <p>aaa</p>
    <router-view name="main"></router-view>
</template>

<script>

export default {
    name: 'App',
    components: {
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
