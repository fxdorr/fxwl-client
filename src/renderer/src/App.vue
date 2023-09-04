<template>
    <router-view></router-view>
</template>

<script lang="ts" setup>
    import appStore from '@/stores/app'
    import panelStore from '@/stores/panel'
    // 配置存储
    imStore.app = toRefs(appStore())
    imStore.panel = toRefs(panelStore())
</script>