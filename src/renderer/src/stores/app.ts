// +----------------------------------------------------------------------
// | Author 唐启云 <tqy@fxri.net>
// +----------------------------------------------------------------------
// | Category 方弦研究所
// +----------------------------------------------------------------------
import { defineStore } from 'pinia'
// 定义数据
export const data = {
    /**
     * 标题
     */
    title: '方弦物联',
    /**
     * 调试模式
     */
    debug: false,
    /**
     * 默认页面
     */
    url_default: '/',
    /**
     * 面板索引
     */
    panel_index: '0',
}
// 定义存储
const store = defineStore('app', {
    state: () => JSON.parse(JSON.stringify(data)),
    persist: true,
})
export default store
