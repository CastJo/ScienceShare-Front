<template>
    <el-main>
        <Navigator/>
        <el-col>
            <el-card>
                <router-view>
                </router-view>
            </el-card>
        </el-col>
    </el-main>
       
</template>
<style></style>
<script>
    import Navigator from "@/components/Navigator.vue";


    export default {
        data() {
            return {msg: 'vue模板页'}
        },
        components: {
            Navigator,
        }
    }
</script>
