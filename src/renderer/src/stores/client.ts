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
    title: '',
}
// 定义存储
const store = defineStore('client', {
    state: () => JSON.parse(JSON.stringify(data)),
    persist: true,
})
export default store
