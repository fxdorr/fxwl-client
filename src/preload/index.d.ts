// +----------------------------------------------------------------------
// | Author 唐启云 <tqy@fxri.net>
// +----------------------------------------------------------------------
// | Category 方弦研究所
// +----------------------------------------------------------------------
import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
    interface Window {
        electron: ElectronAPI
        api: unknown
    }
    /**
     * 本地模块
     */
    const doNative: {
        /**
         * 打开文件
         */
        store: any
        /**
         * 打开文件
         */
        openFile: function
    }
}
