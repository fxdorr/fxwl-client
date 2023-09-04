// +----------------------------------------------------------------------
// | Author 唐启云 <tqy@fxri.net>
// +----------------------------------------------------------------------
// | Category 方弦研究所
// +----------------------------------------------------------------------
import { defineStore } from 'pinia'
// 定义数据
export const data: {
    /**
     * 窗口
     */
    window: {
        /**
         * 宽度
         */
        width: number
        /**
         * 高度
         */
        height: number
        /**
         * 左边距
         */
        x: number | string
        /**
         * 上边距
         */
        y: number | string
        /**
         * 全屏
         */
        fullscreen: boolean
        /**
         * 无边框
         */
        frame: boolean
        /**
         * 置顶
         */
        isTop: boolean
        /**
         * 强制置顶
         */
        isFocus: boolean
        /**
         * 开机自启
         */
        startup: boolean
    }
} = {
    window: {
        width: 1280,
        height: 720,
        x: 'center',
        y: 'center',
        fullscreen: false,
        frame: false,
        isTop: false,
        isFocus: false,
        startup: false,
    },
}
// 定义存储
const store = defineStore('panel', {
    state: () => JSON.parse(JSON.stringify(data)),
    persist: true,
})
export default store
