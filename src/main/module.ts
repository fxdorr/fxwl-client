// +----------------------------------------------------------------------
// | Author 唐启云 <tqy@fxri.net>
// +----------------------------------------------------------------------
// | Category 方弦研究所
// +----------------------------------------------------------------------
import { BrowserWindow, ipcMain, dialog } from 'electron'
import Store from 'electron-store'
const store = new Store()

/**
 * 事件模块
 */
export const doEvent: {
    /**
     * 数据
     */
    data: {
        /**
         * 主窗口
         */
        mainWindow?: BrowserWindow
    }
    /**
     * 注册
     */
    register: any
    /**
     * 存储
     */
    store: any
    /**
     * 打开文件
     */
    openFile: any
} = {
    data: {},
    register: function (mainWindow: BrowserWindow): void {
        // 记录主窗口
        doEvent.data.mainWindow = mainWindow
        // 注册打开文件
        ipcMain.handle('store', doEvent.store)
        // 注册打开文件
        ipcMain.handle('openFile', doEvent.openFile)
    },
    store: function (_event, name: 'set' | 'get', data: any): any {
        switch (name) {
            case 'set':
                // 设置数据
                store.set(data)
                break
            case 'get':
                // 获取数据
                return store.get(data)
        }
    },
    openFile: async function (): Promise<any> {
        // 校验窗口
        if (doEvent.data.mainWindow == undefined) return
        // 打开文件
        const { canceled, filePaths } = await dialog.showOpenDialog(
            doEvent.data.mainWindow,
        )
        // 返回数据
        if (!canceled) {
            return filePaths
        }
    },
}
