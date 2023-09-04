<template>
    <div class="fxy-layout">
        <div class="fxy-header">
            <div class="back" @click="doView.jump('/')"></div>
        </div>
        <div class="fxy-panel">
            <div class="moire-player"></div>
            <div class="moire-desk">
                <div class="moire-wrapper">{{ imStore.client.title.value }}</div>
            </div>
        </div>
        <div v-show="false" class="moire-mould-media">
            <div class="moire-stage" moire-type="video">
                <video id="media-video" class="video-js media-video"></video>
            </div>
            <div class="moire-stage" moire-type="image">
                <img id="media-image" class="media-image">
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { imStore } from '@/libs/base'
    import { doView } from '@/libs/module'
</script>

<style lang="scss" scoped>
    .fxy-layout {
        background: #9173a9 linear-gradient(to bottom right, #a6a7d7, #9173a9);
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
        overflow: hidden;
    }

    .moire-desk {
        display: flex;
        height: 100vh;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

    .moire-banner {
        position: absolute;
        left: 10px;
        top: 10px;
        height: 3vw;
        overflow: hidden;
    }

    .moire-banner img {
        display: block;
        height: inherit;
        filter: drop-shadow(0 3vw 0 #ffffff);
        transform: translateY(-3vw);
    }

    .moire-wrapper {
        font-size: 10vw;
        text-shadow: 3px 2px 6px #eeeeee;
        transition: all 0.4s;
    }

    /* 竖屏 */
    @media screen and (orientation: portrait) {
        .moire-banner {
            height: 3vh;
        }

        .moire-banner img {
            filter: drop-shadow(0 3vh 0 #ffffff);
            transform: translateY(-3vh);
        }

        .moire-wrapper {
            font-size: 10vh;
        }
    }

    .fxy-panel {
        position: relative;
        width: 100vw;
        height: 100vh;
        max-width: 100vw;
        max-height: 100vh;
        overflow: hidden;
    }

    /* 模具 */
    .moire-stage {
        width: 100%;
        height: 100%;
    }

    .moire-stage[moire-type=tips] {
        width: calc(100% - 20px);
        height: calc(100% - 20px);
        padding: 10px;
        font-size: 0.9rem;
        line-height: 1.4rem;
    }

    .moire-stage[moire-type=tips-text] {
        width: calc(100% - 20px);
        height: calc(100% - 20px);
        padding: 10px;
    }

    .moire-stage[moire-type=tips-text] textarea {
        display: block;
        width: 100%;
        height: 100%;
        border: none;
        resize: none;
    }

    /* 媒体 */
    .video-js {
        background: none;
    }

    .moire-stage[moire-type=video] .media-video {
        width: inherit;
        height: inherit;
        object-fit: fill;
    }

    .moire-stage[moire-type=video] .media-video .vjs-tech {
        object-fit: fill;
    }

    .moire-stage[moire-type=video] .media-video .vjs-poster {
        background-size: 100% 100%;
    }

    .moire-stage[moire-type=image] .media-image {
        width: inherit;
        height: inherit;
    }

    .moire-player {
        z-index: 20;
        display: none;
    }

    .moire-desk {
        z-index: 10;
    }

    .moire-player,
    .moire-desk {
        position: absolute;
        width: inherit;
        height: inherit;
        overflow: auto;
    }

    /* 模具 */
    .moire-stage {
        background: #000;
    }
</style>