<template>
    <h1>用户设置</h1>
    <!-- 多级匹配路由中传递的参数会自动转换成一个数组 -->
    <h2>id: {{ id }}</h2>
</template>

<script>
export default {
    props: ['id'],
}
</script>