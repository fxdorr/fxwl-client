// +----------------------------------------------------------------------
// | Author 唐启云 <tqy@fxri.net>
// +----------------------------------------------------------------------
// | Category 方弦研究所
// +----------------------------------------------------------------------
import { data as appStore } from '@/stores/app'
import { data as panelStore } from '@/stores/panel'
import { data as clientStore } from '@/stores/client'
import { Router } from 'vue-router'
/**
 * 应用
 */
export const imApp: {
    /**
     * 初始化
     */
    init: boolean
    /**
     * 应用时钟
     */
    clock: globalThis.Ref<string>
    /**
     * 应用参数
     */
    param: globalThis.Ref
    /**
     * 播放器列表
     */
    players: globalThis.Ref
    /**
     * 通信服务
     */
    socket?: WebSocket
} = {
    init: false,
    clock: ref(''),
    param: ref({}),
    players: ref({}),
}
/**
 * 监听应用参数
 */
doParam.watch('param', imApp)
/**
 * 监听播放器列表
 */
doParam.watch('players', imApp)
/**
 * 存储
 */
export const imStore = {
    /**
     * 应用
     */
    app: toRefs(reactive(appStore)),
    /**
     * 面板
     */
    panel: toRefs(reactive(panelStore)),
    /**
     * 客户端
     */
    client: toRefs(reactive(clientStore)),
}
/**
 * 视图
 */
export const imView: {
    /**
     * 路由器
     */
    router?: Router
    /**
     * 缩放比例
     */
    scale: globalThis.Ref<string>
    /**
     * 数据部署
     */
    deploy: globalThis.Ref
} = {
    scale: ref(''),
    deploy: ref({}),
}
/**
 * 监听数据部署
 */
doParam.watch('deploy', imView)
