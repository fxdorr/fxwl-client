// +----------------------------------------------------------------------
// | Author 唐启云 <tqy@fxri.net>
// +----------------------------------------------------------------------
// | Category 方弦研究所
// +----------------------------------------------------------------------
import { AppContext } from 'vue'
import { LocationQueryRaw } from 'vue-router'
import {
    ElNotification,
    ElMessage,
    NotificationParams,
    MessageParams
} from 'element-plus'
/**
 * 消息模块
 */
export const doInfo = {
    /**
     * 通知消息
     */
    notice: function (options?: NotificationParams | undefined) {
        setTimeout(() => {
            // 设置根元素
            arguments[0].appendTo = '.fxy-layout'
            // 弹出信息
            ElNotification(options)
        }, 0)
    },
    /**
     * 消息提示
     */
    message: function (
        options?: MessageParams,
        appContext?: AppContext | null | undefined
    ) {
        setTimeout(() => {
            // 设置根元素
            arguments[0].appendTo = '.fxy-layout'
            // 弹出信息
            ElMessage(options, appContext)
        }, 0)
    }
}
/**
 * 参数模块
 */
export const doParam = {
    /**
     * 定义变量
     */
    define: function (base: any, data: any, empty: boolean = false) {
        // 定义变量
        $.each(data, function (key, value) {
            if (isObject(base[key]) && isObject(value) && !isEmpty(value)) {
                doParam.define(base[key], value, empty)
            } else if (isEmpty(base[key]) && (empty || isSet(value))) {
                base[key] = value
            }
        })
        return base
    },
    /**
     * 监听变量
     */
    watch: function (name: string, base?: any) {
        // 疏理基础
        if (!isObject(base)) return
        // 疏理数据
        var data: any = localStorage.getItem(name)
        if (isJson(data)) {
            data = JSON.parse(data)
        }
        data = isObject(data) ? data : {}
        // 配置数据
        base[name] = toRef(data)
        // 监听数据
        watch(
            base[name],
            (value) =>
                localStorage.setItem(
                    name,
                    !isString(value) ? JSON.stringify(value) : String(value)
                ),
            { deep: true }
        )
    },
    /**
     * 处理枚举
     */
    enum: function (index: any, enums: any) {
        // 处理枚举
        if (isString(enums)) {
            enums = JSON.parse(enums)
        }
        return isSet(enums[index]) ? enums[index] : ''
    }
}
/**
 * 视图模块
 */
export const doView = {
    /**
     * 计算缩放
     */
    scale: function (
        width: number,
        height: number,
        boxW = $('#app').width(),
        boxH = $('#app').height()
    ) {
        // 定义宽高
        !boxW && (boxW = width)
        !boxH && (boxH = height)
        // 计算缩放
        return 'transform: scale(' + boxW / width + ', ' + boxH / height + ')'
    },
    /**
     * 跳转页面
     */
    jump: function (url?: string, param?: LocationQueryRaw) {
        imView.router && imView.router.push({ path: url, query: param })
    },
    /**
     * 处理URL
     */
    url: function (url: string) {
        // 检查url
        if (!isUrl(url)) {
            url = imStore.app.uri_host.value + url
        }
        return url
    }
}
