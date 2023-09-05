<template>
    <router-view></router-view>
</template>

<script lang="ts" setup>
    import appStore from '@/stores/app'
    import panelStore from '@/stores/panel'
    import clientStore from '@/stores/client'
    import { storeToRefs } from 'pinia'
    // 配置存储
    const stores = { app: appStore, panel: panelStore, client: clientStore }
    for (const index in stores) {
        // 终端数据
        imStore[index] = toRefs(stores[index]())
        // 本地数据
        window.doNative != undefined && doNative.store('get', index).then(function(res) {
            $.each(res, function(key, value) {
                imStore[index][key].value = value
            })
        })
        // 监听存储
        watch(
            reactive(storeToRefs(stores[index]())),
            (data) => {
                window.doNative != undefined && doNative.store('set', {
                    [index]: JSON.parse(JSON.stringify(data)) })
            }, { deep: true },
        )
    }
</script>