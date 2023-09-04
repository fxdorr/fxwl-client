<template>
    <router-view></router-view>
</template>

<script lang="ts" setup>
    import appStore from '@/stores/app'
    import panelStore from '@/stores/panel'
    import serverStore from '@/stores/server'
    import clientStore from '@/stores/client'
    // 配置存储
    imStore.app = toRefs(appStore())
    imStore.panel = toRefs(panelStore())
    imStore.server = toRefs(serverStore())
    imStore.client = toRefs(clientStore())
    // 监听数据
    watch(
        reactive(imStore.app),
        (data) => {
            console.log(977858)
            console.log(data)
            console.log(Object.keys(data))
            console.log(Object.values(data))
        }, { deep: true },
    )
</script>