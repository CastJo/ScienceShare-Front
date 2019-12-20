<template>
        <el-row>
            <el-col :span="12" v-for="item in experts" :key="item.id" style="margin-top: 10px;">
                <el-card shadow="hover" >
                    <el-row class="ep-result" >
                        <el-col :span="20" style="text-align: left;">
                            <strong>{{item.name}}</strong>
                            <!--                <div style="font-weight: lighter;color: dimgrey;">BUAA</div>-->
                            <div style="font-weight: lighter;color: dimgrey;margin-top: 70px">{{item.n_pubs}} Publications {{item.n_citation}} Citations</div>
                        </el-col>
                        <el-col :span="4" style="text-align: right;">
                            <div class="block"><el-avatar :size="80" :src="circleUrl"></el-avatar></div>
                            <el-button type="primary" size="mini" icon="el-icon-plus" style="margin-bottom: 5px; margin-right: 1px;">关注</el-button>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
</template>
<style>
    .ep-result{
        min-height: 100px;
    }
</style>
<script>
    export default {
        data() {
            return {
                experts:[],

            }
        },
        mounted(){
            this.$axios
                .get("litcenter/getTop5Authors", {
                    params: {
                        name: this.$route.params.keyword
                    }
                })
                .then(successResponse => {
                    console.log(successResponse.data);
                    this.experts = successResponse.data;
                    console.log(successResponse.data.name);
                })
                .catch(failResponse => {
                    console.log(failResponse);
                });
        }
    }
</script>
