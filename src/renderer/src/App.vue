<template>
    <router-view></router-view>
</template>

<script lang="ts" setup>
    import store from '@/utils/store'
    import { storeToRefs } from 'pinia'
    // 配置存储
    imStore.app = toRefs(store.app.store())
    imStore.panel = toRefs(store.panel.store())
    imStore.client = toRefs(store.client.store())
    $.each(imStore, function(key) {
        // 终端数据
        // 本地数据
        window.doNative != undefined && doNative.store('get', key).then(function(res) {
            if (res == undefined) {
                store[key].store().$reset()
            }
            $.each(res, function(key, value) {
                imStore[key][key].value = value
            })
        })
        // 监听存储
        watch(
            reactive(storeToRefs(store[key].store())),
            (data) => {
                window.doNative != undefined && doNative.store('set', {
                    [key]: JSON.parse(JSON.stringify(data))
                })
            }, { deep: true },
        )
    })
</script>