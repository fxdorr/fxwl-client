// +----------------------------------------------------------------------
// | Author 唐启云 <tqy@fxri.net>
// +----------------------------------------------------------------------
// | Category 方弦研究所
// +----------------------------------------------------------------------
import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import Store from 'electron-store'
import httpServer from 'http-server'
import net from 'net'
import path from 'path'
import fs from 'fs'
// /**
//  * 检测端口占用
//  */
// export function isBindPort(port: number): boolean {
//     let resut
//     const server = net.createServer()
//     server.on('error', (err) => {
//         console.log(err)
//         console.log(err.message)
//         console.log(err.stack)
//         console.log(err.name)
//         console.log(err.cause)
//     })
//     server.listen(port)
//     return false
// }
/**
 * 根路径
 */
const doRoot = app.isPackaged
    ? path.resolve(app.getPath('exe'), '..')
    : path.resolve(app.getAppPath())
/**
 * 基础模块
 */
export const doBase: {
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
    /**
     * 注册事件
     */
    register: any
} = {
    app: {},
    root: doRoot,
    store: new Store({
        cwd: path.resolve(
            doRoot,
            app.isPackaged ? '../fxwl-local/config' : 'config',
        ),
    }),
    register: function (mainWindow: BrowserWindow): void {
        // 记录主窗口
        doBase.app.mainWindow = mainWindow
        // 配置事件
        for (const key in doEvent) {
            ipcMain.handle(key, doEvent[key])
        }
    },
}
/**
 * 获取配置
 */
const config: any = doBase.store.get('panel.server')
/**
 * 创建HTTP服务
 */
if (config?.switch) {
    // 疏理配置
    config?.port != undefined && (config.port -= 0)
    typeof config?.port != 'number' && (config.port = 2602)
    // 疏理目录
    if (app.isPackaged) {
        config.dir = '../fxwl-local/' + config.dir
    }
    // 创建目录
    if (!fs.existsSync(path.resolve(doBase.root, config.dir))) {
        fs.mkdirSync(path.resolve(doBase.root, config.dir))
    }
    // // 检测端口占用
    // console.log(config.port)
    // console.log(isBindPort(config.port))
    // isPortAvailable(config.port).then((event) => {
    //     console.log(event)
    // })
    // 创建服务
    httpServer
        .createServer({
            root: path.resolve(doBase.root, config.dir),
            showDir: false,
        })
        .listen(config.port)
}
/**
 * 事件模块
 */
export const doEvent: {
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
                doBase.store.set(data)
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
                return doBase.store.get(data)
        }
    },
    openFile: async function (): Promise<any> {
        // 校验窗口
        if (doBase.app.mainWindow == undefined) return
        // 打开文件
        const { canceled, filePaths } = await dialog.showOpenDialog(
            doBase.app.mainWindow,
        )
        // 返回数据
        if (!canceled) {
            return filePaths
        }
    },
}
