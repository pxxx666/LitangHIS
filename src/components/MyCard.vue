<script setup>
    import { ElMessage, ElMessageBox } from 'element-plus'
    const open = () => {
        ElMessageBox.confirm(
            '您确定要预约该医生?',
            'Warning',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'info',
            }
        )
            .then(() => {
                ElMessage({
                    type: 'success',
                    message: '预约成功',
                })
            })
            .catch(() => {
                ElMessage({
                    type: 'info',
                    message: '预约删除',
                })
            })
    }
</script>
<template>
    <el-card class="card" style="max-width: 380px" shadow="hover">
        <template #header>
            <div class="card-header">
                <span><b>妇产科：</b>马嘉祺</span>
            </div>
        </template>
        <el-image
            src="https://tse2-mm.cn.bing.net/th/id/OIP-C.2TBjtzKGnhvM0au-FHwD7AHaHa?w=201&h=201&c=7&r=0&o=5&dpr=1.5&pid=1.7"
            style="width: 50%;border-radius: 50%;" lazy></el-image>
        <p><b>医生介绍：</b>阿斯达卡送监督卡萨克贷记卡就是看得见啊就开始打卡机可视对讲喀什假大空监控数据库的急啊看数据的卡就是看得见啊ask贷记卡设计大咖是看得见ask进口的数据库</p>
        <strong>挂号数量:100</strong>
        <template #footer><el-button id="button" size="large" style="width: 100px;" type="primary" plain
                @click="open">预约</el-button></template>
    </el-card>

</template>
<style>
    .card {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .el-image {
        display: block;
        margin: 0 auto;
    }
</style>