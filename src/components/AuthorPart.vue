<template>
    <div style="width: inherit;height: 80px;margin-top: 10px">
        <div >
            <el-divider/>
        </div>
        <div>
            <div style="float: left;height: inherit;">
                <el-avatar slot="text" style="height: 70px;width: 70px">
                    <template>
                        <div style="vertical-align: middle;height: inherit;width: inherit">
                            <span style="vertical-align: middle">{{this.author.name}}</span>
                        </div>
                    </template>
                </el-avatar>
            </div>
            <div style="float: left;height: inherit">
                <span>{{this.author.name}}</span><br/>
                <span>{{this.magAuthor.org}}</span><br/>
                <span v-if="haveResult">{{this.magAuthor.n_pubs}}篇发表</span>
                <span v-else>1篇发表</span>
            </div>
            <div style="float: right;padding-top: 12px;height: inherit">
                <el-button @click="goExpertPage">去个人主页></el-button>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "AuthorPart",
        data(){
            return{
                magAuthor:"",
                haveResult :"",
            };
        },
        mounted(){
            this.$axios.get("litcenter/getAuthor",{
                params:{
                    id: this.author.id,
                }
            }).then((res)=>{
                if(res.status === 200){
                    this.magAuthor = res.data;
                    this.haveResult = res.data === "";
                }
            })
        },
        methods:{
            goExpertPage(){
                console.log(this.author.id)
                this.$store.commit("setPrework", this.author.id);
                this.$router.push("/main/overview");
            }
        },
        props:["author"],
    }
</script>

<style scoped>

</style>