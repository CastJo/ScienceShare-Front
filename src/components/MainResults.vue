<template>
     <el-table
        :data="searchresults"
        style="width: 100%;text-align: center; margin-left: 30px;">
    <el-table-column
            prop="title"
            label="Title"
            width="550">
    </el-table-column>
    <el-table-column
            prop="authors[0].name"
            label="Authors"
            width="150">
    </el-table-column>
<!--    <el-table-column-->
<!--            prop="time"-->
<!--            label="Time"-->
<!--            sortable-->
<!--            width="120">-->
<!--            width="120">-->
<!--    </el-table-column>-->
    <el-table-column
            prop="n_citation"
            label="Citation"
            width="100"
            sortable
            style="float: right;">
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
</template>
<style></style>
<script>
    export default {
        data() {
            return {
                searchresults:[],
                pageNum:'1',
                max:''
            }
        },
        mounted(){
            console.log(this.$route.params.keyword);
            var num = this.pageNum;
            this.$axios
                .get("litcenter/getTop100LITsByPaging", {
                    params: {
                        title: this.$route.params.keyword,
                        pageNumber: num
                    }
                })
                .then(successResponse => {

                    this.max = successResponse.data.totalPage;
                    this.searchresults = successResponse.data.lits;
                    console.log(this.searchresults.id);
                    //this.searchresults.author = successResponse.data.lits.map(item => item.author[1].name);

                    // this.searchresults = successResponse.data.lits.map(item => {
                    //     return{
                    //         title: item.title,
                    //         author: item.author[1].name,
                    //         n_citation: item.n_citation
                    //     }
                    // })
                })
                .catch(failResponse => {
                    console.log(failResponse);
                });
        },
        methods:{
            getAuthorName(){

            }
        }

    }
</script>
