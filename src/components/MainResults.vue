<template>
    <div >
        <el-table
                :data="searchresults"
                stripe
                highlight-current-row
                @current-change="jumpToLitInfo"
                style="width: 100%;text-align: center;cursor:pointer">
            <el-table-column
                    prop="title"
                    label="标题"
                    width="600">
            </el-table-column>
            <el-table-column
                    @click="jumpToLitInfo"
                    prop="authors[0].name"
                    label="作者"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="n_citation"
                    label="引用数"
                    width="90"
                    sortable
                    style="float: right;">
            </el-table-column>
            <el-table-column>
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleAdd(scope.$index, scope.row)">
                        收藏
                    </el-button>
                </template>
            </el-table-column>
            <!--    <el-table-column-->
            <!--            prop="collected"-->
            <!--            label="Collect"-->
            <!--            style="float: right;margin-left:20px;">-->
            <!--        <el-button-->
            <!--                size="mini"-->
            <!--                icon="el-icon-star-off"-->
            <!--                @click="handleCollect(scope.$index, scope.row)"></el-button>-->
            <!--    </el-table-column>-->
        </el-table>
        <el-row style="text-align: center;margin-top: 20px;">
            <el-pagination
                    :page-size="10"
                    :pager-count="11"
                    :current-page.sync="pageNum"
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
                searchresults: [],
                pageNum: 1,
                max: ''
            }
        },
        mounted() {
            console.log(this.$route.params.keyword);
            this.$axios
                .get("litcenter/getTop100LITsByPaging", {
                    params: {
                        title: this.$route.params.keyword,
                        pageNumber: this.pageNum
                    }
                })
                .then(successResponse => {
                    this.max = successResponse.data.totalPage;
                    this.searchresults = successResponse.data.lits;
                    //console.log(this.searchresults.id);
                })
                .catch(failResponse => {
                    console.log(failResponse);
                });
        },
        methods: {
            jumpToLitInfo(val){
                this.$router.push(`/litInfo/${val.id}`);
            },
            handleCurrentChange(val) {
                console.log(val);
                this.$axios
                    .get("litcenter/getTop100LITsByPaging", {
                        params: {
                            title: this.$route.params.keyword,
                            pageNumber: val
                        }
                    })
                    .then(successResponse => {
                        this.searchresults = successResponse.data.lits;
                        //console.log(this.searchresults.id);
                    })
                    .catch(failResponse => {
                        console.log(failResponse);
                    });
            },
            handleAdd(index, row) {
                this.$axios
                    .get("usercenter/addToFavorites", {
                        params: {
                            username: this.$store.state.user.username,
                            paperId: row.id,
                        }
                    })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.$notify({
                                title: "收藏成功",
                                message: row.title + " 已加入你的收藏",
                                type: "success"
                            })
                        } else {
                            this.$notify.error({
                                title: "错误",
                                message: "未加入收藏"
                            })
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })

            }
        }
    }
</script>
