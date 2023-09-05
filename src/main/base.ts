// +----------------------------------------------------------------------
// | Author 唐启云 <tqy@fxri.net>
// +----------------------------------------------------------------------
// | Category 方弦研究所
// +----------------------------------------------------------------------
import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import Store from 'electron-store'
import path from 'path'
import httpServer from 'http-server'
/**
 * 数据模块
 */
export const doData: {
    /**
     * 应用数据
     */
    app: {
        /**
         * 主窗口
         */
        mainWindow?: BrowserWindow
    }
    /**
     * 根路径
     */
    root: string
    /**
     * 存储数据
     */
    store: Store
} = {
    app: {},
    root: app.isPackaged
        ? path.resolve(app.getPath('exe'), '..')
        : path.resolve(app.getAppPath()),
    store: app.isPackaged
        ? new Store({ cwd: path.resolve(app.getPath('exe'), '../config') })
        : new Store({ cwd: path.resolve(app.getAppPath(), 'config') }),
}
// 创建http服务
httpServer
    .createServer({
        root: 'e:/',
    })
    .listen(doData.store.get('panel.server.port') ?? 2602)
/**
 * 事件模块
 */
export const doEvent: {
    /**
     * 注册事件
     */
    register: any
    /**
     * 重启应用
     */
    restart: any
    /**
     * 退出应用
     */
    quit: any
    /**
     * 数据存储
     */
    store: any
    /**
     * 打开文件
     */
    openFile: any
} = {
    register: function (mainWindow: BrowserWindow): void {
        // 记录主窗口
        doData.app.mainWindow = mainWindow
        // 重启应用
        ipcMain.handle('restart', doEvent.restart)
        // 退出应用
        ipcMain.handle('quit', doEvent.quit)
        // 数据存储
        ipcMain.handle('store', doEvent.store)
        // 打开文件
        ipcMain.handle('openFile', doEvent.openFile)
    },
    restart: function (): void {
        app.relaunch()
        app.quit()
    },
    quit: function (): any {
        app.quit()
    },
    store: function (_event: any, name: 'set' | 'get', data: any): any {
        switch (name) {
            case 'set':
                // 设置数据
                doData.store.set(data)
                // 判断开机自启
                if (typeof data?.panel?.window?.startup == 'boolean') {
                    // 设置开机自起
                    const exeName = path.basename(process.execPath)
                    app.setLoginItemSettings({
                        // 设置为true注册开机自起
                        openAtLogin: data.panel.window.startup,
                        // macOs
                        openAsHidden: false,
                        path: process.execPath,
                        args: ['--processStart', `"${exeName}"`],
                    })
                }
                break
            case 'get':
                // 获取数据
                return doData.store.get(data)
        }
    },
    openFile: async function (): Promise<any> {
        // 校验窗口
        if (doData.app.mainWindow == undefined) return
        // 打开文件
        const { canceled, filePaths } = await dialog.showOpenDialog(
            doData.app.mainWindow,
        )
        // 返回数据
        if (!canceled) {
            return filePaths
        }
    },
}
