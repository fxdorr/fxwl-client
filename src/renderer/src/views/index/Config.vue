<template>
    <div class="fxy-layout">
        <el-form class="fxy-panel" label-position="top">
            <el-tabs v-model="imStore.app.panel_index.value" type="border-card" @tab-change="tabChange">
                <el-tab-pane label="应用">
                    <el-divider content-position="left">环境配置</el-divider>
                    <el-form-item label="应用标题">
                        <el-input v-model="imStore.app.title.value" type="text" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="调试模式">
                        <el-switch v-model="imStore.app.debug.value" size="large" inline-prompt style="--el-switch-on-color: #13ce66;" active-text="开启" inactive-text="关闭" />
                    </el-form-item>
                    <el-form-item label="页面地址（HTTP）">
                        <el-input v-model="imStore.app.url_host.value" type="text" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="接口地址（HTTP）">
                        <el-input v-model="imStore.app.api_host.value" type="text" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="资源地址（HTTP）">
                        <el-input v-model="imStore.app.uri_host.value" type="text" autocomplete="off" />
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="面板">
                    <el-divider content-position="left">窗口配置</el-divider>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="宽度">
                                <el-input v-model="imStore.panel.window.value.width" type="text" autocomplete="off" />
                            </el-form-item>
                            <el-form-item label="左边距">
                                <el-input v-model="imStore.panel.window.value.x" type="text" autocomplete="off" />
                            </el-form-item>
                            <el-form-item label="全屏">
                                <el-switch v-model="imStore.panel.window.value.fullscreen" size="large" inline-prompt style="--el-switch-on-color: #13ce66;" active-text="开启" inactive-text="关闭" />
                            </el-form-item>
                            <el-form-item label="无边框">
                                <el-switch v-model="imStore.panel.window.value.frame" size="large" inline-prompt style="--el-switch-on-color: #13ce66;" active-text="开启" inactive-text="关闭" />
                            </el-form-item>
                            <el-form-item label="开机自启">
                                <el-switch v-model="imStore.panel.window.value.startup" size="large" inline-prompt style="--el-switch-on-color: #13ce66;" active-text="开启" inactive-text="关闭" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" class="col-right">
                            <el-form-item label="高度">
                                <el-input v-model="imStore.panel.window.value.height" type="text" autocomplete="off" />
                            </el-form-item>
                            <el-form-item label="上边距">
                                <el-input v-model="imStore.panel.window.value.y" type="text" autocomplete="off" />
                            </el-form-item>
                            <el-form-item label="置顶">
                                <el-switch v-model="imStore.panel.window.value.isTop" size="large" inline-prompt style="--el-switch-on-color: #13ce66;" active-text="开启" inactive-text="关闭" />
                            </el-form-item>
                            <el-form-item label="强制置顶">
                                <el-switch v-model="imStore.panel.window.value.isFocus" size="large" inline-prompt style="--el-switch-on-color: #13ce66;" active-text="开启" inactive-text="关闭" />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="服务端">
                    <el-divider content-position="left">环境配置</el-divider>
                    <el-form-item label="站点地址">
                        <el-input v-model="imStore.server.host.value" type="text" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="站点端口">
                        <el-input v-model="imStore.server.port.value" type="text" autocomplete="off" />
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="客户端">
                    <el-divider content-position="left">环境配置</el-divider>
                    <el-form-item label="终端标题">
                        <el-input v-model="imStore.client.title.value" type="text" autocomplete="off" />
                    </el-form-item>
                </el-tab-pane>
            </el-tabs>
        </el-form>
        <el-row class="fxy-footer">
            <el-col :span="16">
                <el-button type="success" @click="reloadPage">刷新页面</el-button>
                <el-popconfirm confirm-button-text="是" cancel-button-text="否" title="重置为默认值?" @confirm="reloadStore">
                    <template #reference>
                        <el-button>全部重置</el-button>
                    </template>
                </el-popconfirm>
                <el-button @click="cleanCache">清理缓存</el-button>
                <el-button @click="doView.jump('/')">返回首页</el-button>
            </el-col>
            <el-col :span="8" class="op-right">
                <el-button type="warning" @click="restartApp">重启应用</el-button>
                <el-button type="danger" @click="exitApp">退出应用</el-button>
            </el-col>
        </el-row>
    </div>
</template>
<script lang="ts" setup>
    import { imApp, imStore, imView } from '@/libs/base'
    import { doView } from '@/libs/module'
    import appStore from '@/stores/app'
    import panelStore from '@/stores/panel'
    import serverStore from '@/stores/server'
    import clientStore from '@/stores/client'
    // 配置索引
    function tabChange(name: any): void {
        imStore.app.panel_index.value = name
    }
    // 刷新存储
    function reloadStore(): void {
        // 重置数据
        appStore().$reset()
        panelStore().$reset()
        serverStore().$reset()
        clientStore().$reset()
        // 清理缓存
        cleanCache()
    }
    // 清理缓存
    function cleanCache(): void {
        // 清空参数
        imApp.param.value = {}
        imApp.players.value = {}
        imView.deploy.value = {}
        // 刷新页面
        reloadPage()
    }
    // 刷新页面
    function reloadPage(): void {
        window.location.reload()
    }
    // 重启应用
    function restartApp(): void {
        // doNative.store('set', { '测试数据': '测试数据2' })
    }
    // 退出应用
    function exitApp(): void {
        window.location.reload()
    }
</script>
<style lang="scss" scoped>
    .el-tabs--border-card>.el-tabs__content {
        padding: 0 15px;
    }

    .fxy-panel {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        padding: 10px 10px 52px 10px;
    }

    .fxy-panel .col-right {
        padding-left: 10px;
    }

    .fxy-footer {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 10px;
        background: #fff;
    }

    .fxy-footer .op-right {
        text-align: right;
    }
</style>