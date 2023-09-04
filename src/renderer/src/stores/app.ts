// +----------------------------------------------------------------------
// | Author 唐启云 <tqy@fxri.net>
// +----------------------------------------------------------------------
// | Category 方弦研究所
// +----------------------------------------------------------------------
import { defineStore } from 'pinia'
// 定义数据
export const data = {
    // 标题
    title: '杭州交工',
    // 调试模式
    debug: false,
    // 接口地址
    api_host: location.protocol + '//' + location.hostname,
    // 资源地址
    uri_host: location.protocol + '//' + location.hostname,
}
// 定义存储
const store = defineStore('app', {
    state: () => JSON.parse(JSON.stringify(data)),
    persist: true
})
export default store
