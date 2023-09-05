<template>
    <div class="fxy-layout">
        <div class="fxy-header">
            <div class="back" :style="imStore.client.back_btn.value" @click="doView.jump('/')"></div>
        </div>
        <div class="fxy-panel">
            <iframe :src="imStore.client.url_host.value" frameborder="0"></iframe>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { imStore } from '@/libs/base'
    import { doView } from '@/libs/module'
</script>

<style lang="scss" scoped>
    .fxy-layout {
        font-family: 'KaiTi';
        font-weight: bold;
        color: #ffffff;
        cursor: default;
        user-select: none;
    }

    .fxy-header {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        z-index: 999;
    }

    .fxy-header .back {
        position: fixed;
        left: 0;
        top: 0;
        width: 160px;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .fxy-header .back:hover {
        background: rgba($color: #fff, $alpha: 0.1);
    }

    .fxy-panel {
        position: relative;
        width: 100vw;
        height: 100vh;
        max-width: 100vw;
        max-height: 100vh;
        overflow: hidden;
    }

    .fxy-panel iframe {
        width: 100%;
        height: 100%;
    }
</style>