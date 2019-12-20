<template>
    <div>
        <el-row>
            <el-col :span="12" v-for="item in users" :key="item.id" style="margin-top: 10px;">
                <el-card shadow="hover" >
                    <el-row class="ep-result" >
                        <el-col :span="20" style="text-align: left;">
                            <strong>{{item.username}}</strong>
                            <div style="font-weight: lighter;color: dimgrey;">email: {{item.emailAddress}}</div>
                            <!--                <div style="font-weight: lighter;color: dimgrey;">BUAA</div>-->
                            <div style="font-weight: lighter;color: dimgrey;margin-top: 45px"> {{item.college}}</div>
                        </el-col>
                        <el-col :span="4" style="text-align: right;">
                            <div class="block" ><el-button type="text" @click="ToIndex(item)"><el-avatar :size="80" :src="item.avatarUrl"></el-avatar></el-button></div>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
        <el-row style="text-align: center;margin-top: 20px;">
            <el-pagination
                    :page-size="10"
                    :pager-count="11"
                    :hide-on-single-page="pageNumber"
                    :current-page.sync = "pageNumber"
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange"
                    :total="max*10"
                    style="margin: auto;">
            </el-pagination>
        </el-row>
    </div>
       

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
        },
        methods:{
            ToIndex(Item){
                this.$router.push(`/index/${Item.username}`);
            },
            handleCurrentChange(val){
                this.$axios
                    .get("litcenter/getUsersByPaging", {
                        params: {
                            name: this.$route.params.keyword,
                            pageNumber: this.pageNumber
                        }
                    })
                    .then(successResponse => {
                        //console.log(successResponse.data);
                        this.users = successResponse.data.list;
                        this.max = successResponse.data.totalPage;
                    })
                    .catch(failResponse => {
                        console.log(failResponse);
                    });
            }
        }
    }
</script>
