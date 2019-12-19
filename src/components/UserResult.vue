<template>   
    <el-row>
        <el-col :span="12" v-for="item in experts" :key="item.id" style="margin-top: 10px;">
            <el-card shadow="hover" >
                <el-row class="ep-result" >
                    <el-col :span="20" style="text-align: left;">
                        <strong>{{item.username}}</strong>
                        <!--                <div style="font-weight: lighter;color: dimgrey;">BUAA</div>-->
                        <div style="font-weight: lighter;color: dimgrey;margin-top: 70px"> {{item.college}}</div>
                    </el-col>
                    <el-col :span="4" style="text-align: right;">
                        <div class="block"><el-avatar :size="80" :src="item.avatarUrl"></el-avatar></div>
                        <el-button type="primary" size="mini" icon="el-icon-plus" style="margin-bottom: 5px; margin-right: 1px;">关注</el-button>
                    </el-col>
                </el-row>
            </el-card>
        </el-col>
    </el-row>
</template>
<style></style>
<script>
    export default {
        data() {
            return {
                users:[],
                max:'',
                pageNumber:'1'
            }
        },
        mounted(){
            this.$axios
                .get("litcenter/getUsersByPaging", {
                    params: {
                        name: this.$route.params.keyword,
                        pageNumber: this.pageNumber
                    }
                })
                .then(successResponse => {
                    console.log(successResponse.data);
                    this.users = successResponse.data.list;
                    this.max = successResponse.data.totalPage;
                })
                .catch(failResponse => {
                    console.log(failResponse);
                });
        }
    }
</script>
