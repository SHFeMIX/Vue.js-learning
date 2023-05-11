<template>
    <h1>用户中心</h1>
    <h1>姓名: {{ $route.params.username }}</h1>
    <router-view></router-view>
</template>

<script>
export default {
    // 对应相同的组件的路由在进行导航切换时，相同的组件并不会背销毁再创建，所以组件的生命周期方法都不会再调用， 比如mounted
    // beforeRouteUpdate(to, from) {
    //     console.log(to, from);
    // },
}
</script>