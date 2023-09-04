<template>
    <div class="fxy-layout">
        <el-form class="fxy-panel" label-position="top">
            <el-tabs v-model="imStore.app.panel_index.value" type="border-card" @tab-change="tabChange">
                <el-tab-pane label="应用">
                    <el-divider content-position="left">环境配置</el-divider>
                    <el-form-item label="网站标题">
                        <el-input v-model="imStore.app.title.value" type="text" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="调试模式">
                        <el-switch v-model="imStore.app.debug.value" size="large" inline-prompt style="--el-switch-on-color: #13ce66;" active-text="开启" inactive-text="关闭" />
                    </el-form-item>
                    <el-form-item label="接口地址（HTTP）">
                        <el-input v-model="imStore.app.api_host.value" type="text" autocomplete="off" />
                    </el-form-item>
                    <el-form-item label="资源地址（HTTP）">
                        <el-input v-model="imStore.app.uri_host.value" type="text" autocomplete="off" />
                    </el-form-item>
                </el-tab-pane>
                <el-form-item>
                    <el-button type="primary" @click="reloadPage">刷新页面</el-button>
                    <el-popconfirm confirm-button-text="是" cancel-button-text="否" title="重置为默认值?" @confirm="reloadStore">
                        <template #reference>
                            <el-button>全部重置</el-button>
                        </template>
                    </el-popconfirm>
                    <el-button @click="cleanCache">清理缓存</el-button>
                    <el-button @click="doView.jump('/')">返回首页</el-button>
                </el-form-item>
            </el-tabs>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
    import { imApp, imStore, imView } from '@/libs/base'
    import { doView } from '@/libs/module'
    import appStore from '@/stores/app'
    import panelStore from '@/stores/panel'
    // 配置索引
    function tabChange(name: any): void {
        imStore.app.panel_index.value = name
    }
    // 刷新存储
    function reloadStore(): void {
        // 重置数据
        appStore().$reset()
        panelStore().$reset()
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
</script>
<style lang="scss" scoped>
    .fxy-panel {
        padding: 10px;
    }

    .el-tabs--border-card>.el-tabs__content {
        padding: 0 15px;
    }
</style>