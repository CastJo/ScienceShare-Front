<template>
    <el-main style="min-width: 900px;padding-top: 0">
        <Navigator/>
    <div>
        <div style="float: left;width: 70%;height: 600px;padding-right: 20px">
            <el-card style="height: 600px; padding: 20px 20px 20px 20px">
                <div style="float:none;width: 100%;height: 40px">
                    <div style="float: left">
                        <el-button @click="back">返回</el-button>
                    </div>
                    <div style="float:right">
                        <el-button type="primary" @click="addToFav">收藏</el-button>
                    </div>
                </div>
                <div style="float: none">
                    <el-divider style="margin: 10px 0"/>
                    <h1>{{this.lit.title}}</h1>
                    <h5>发表年份：{{this.lit.year}}</h5>
                    <h5 v-if="this.lit.venue !== null">发表期刊：{{this.lit.venue.raw}}</h5>
                    <h5 v-else>发表期刊：无</h5>
                    <h5>被引用数：{{this.lit.n_citation}}</h5>
                    <h5>开始页数：{{this.lit.page_start}}</h5>
                    <h5>结束页数：{{this.lit.page_end}}</h5>
                    <h5>发行商：{{this.lit.publisher}}</h5>
                    <h5>册号：{{this.lit.volume}}</h5>
                    <h5>期号：{{this.lit.issue}}</h5>
                </div>
        </el-card></div>
        <div style="float: right;width: 30%;height: 600px">
            <el-card style="height: 600px">
                <h4>作者</h4>

                <li
                        style="overflow:auto;list-style: none;padding: 0 0 0 0; max-height: 400px"
                        v-for="i in this.lit.authors"
                        class="infinite-list-item"
                        :key="i._name"
                >
                    <AuthorPart :author="i"/>
                </li>
            </el-card>
        </div>
    </div>
    </el-main>
</template>

<script>
    import Navigator from "../components/Navigator";
    import AuthorPart from "../components/AuthorPart";
    export default {
        name: "LITInfo",
        data() {
            return {
                lit:[],
            };
        },
        components: {AuthorPart, Navigator},

        methods:{
            back(){
                window.history.back();
            },
            addToFav(){
                this.$axios.get("usercenter/addToFavorites",{
                    params:{
                        username: this.$store.state.user.username,
                        paperId:this.lit.id,
                    }
                }).then((res)=>{
                    if(res.status === 200){
                        this.$notify({
                            title:"成功!",
                            message:"收藏成功!",
                            type:"success",
                        })
                    }
                })
            },
            getLit(){
                this.$axios.get("litcenter/getLIT",{
                    params:{
                        id : this.$router.currentRoute.params.litID,
                    }
                }).then((res)=>{
                    if(res.status === 200) {
                        console.log(res.data)
                        this.lit = res.data;
                    }
                })
            }
        },
        created(){
            this.getLit();
        }
    }
</script>

<style scoped>

</style>