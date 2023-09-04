<template>
    <div class="fxy-layout">
        <el-row :gutter="20">
            <el-col v-for="(item, index) in list" :key="index" :xs="24" :sm="12" :md="6">
                <el-card class="box-card">
                    <template #header>
                        <div class="title">
                            <span>{{ item.title }}</span>
                            <el-button type="success" plain @click="doView.jump(item.url)">跳转页面</el-button>
                        </div>
                    </template>
                    <div>
                        <span>{{ item.url }}</span>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts" setup>
    import { doView } from '@/libs/module'
    // 初始化变量
    const list = ref([{
        'title': '配置项',
        'url': '/config',
    }, {
        'title': '客户端',
        'url': '/client/index',
    }])
</script>

<style lang="scss" scoped>
    .el-row {
        padding: 10px 5px !important;
        margin: 0 !important;
    }

    .el-row:last-child {
        margin-bottom: 0;
    }

    .el-col {
        padding: 0 5px !important;
        margin-bottom: 10px;
        border-radius: 4px;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }

    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>