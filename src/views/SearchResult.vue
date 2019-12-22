<template>
    <el-main style="padding-top: 0;">
        <Navigator/>

        <el-row style="min-height: 150px;margin-top: 100px;">
            <el-col :span="7" style="font-weight:lighter;font-size: 40px;text-align: right; color: #2c3e50;">
                Search
            </el-col>
            <el-col :span="16" style="text-align: left;margin-left: 8px;margin-top: 3px;">
                <el-autocomplete
                        class="large-ipt"
                        v-model="input"
                        :fetch-suggestions="querySearch"
                        placeholder="Search Something?"
                        :trigger-on-focus="false"
                        @select="handleSelect"
                >
                    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                    <template slot-scope="{ item }">
                        <div style="float: left;width:350px;text-overflow:ellipsis;white-space:nowrap; overflow:hidden"><strong>{{ item.value }}</strong></div>
                        <div style="float: right">{{ item.type }}</div>
                    </template>
                </el-autocomplete>
            </el-col>
        </el-row>
        <el-row style="margin: auto;max-width: 1000px;">
                <el-tabs v-model="activeName" @tab-click="handleClick" style="min-width: 900px;margin: auto;">
                    <el-tab-pane label="专家" name="expertresult">
                        <router-view></router-view>
                    </el-tab-pane>
                    <el-tab-pane label="文献" name="mainresults">
                        <el-card class="mid-center" style="max-width: 1000px;margin:auto;">
                        <router-view></router-view>
                    </el-card></el-tab-pane>
                    <el-tab-pane label="用户" name="userresult">
                        <router-view></router-view>
                    </el-tab-pane>
                </el-tabs>

        </el-row>
    </el-main>
       
</template>
<style>
    .large-ipt{
        min-width: 500px;
    }
</style>
<script>
    import Navigator from "@/components/Navigator.vue";


    export default {
        data() {
            return {
                tepSearch:[],
                activeName:'expertresult',
                input:'',
                keyword:''
            }
        },
        mounted(){
            this.keyword = this.$route.params.keyword;
            this.$router.push({
                name: 'expertresult',
                params:{
                    keyword:this.keyword
                }
            });
            if (this.$store.state.user.isLogin==null){
                this.$router.push("/");
            }
        },
        methods:{
            handleClick(tab,event){
                // console.log(tab,event);
                // console.log(tab.name);
                this.$router.push({
                    name: tab.name,
                    params:{
                        keyword:this.keyword
                    }
                });
            },
            querySearch(queryString,cb){
                this.$axios
                    .get("litcenter/getBoth", {
                        params: {
                            params: queryString
                        }
                    })
                    .then(successResponse => {
                        console.log(successResponse.data.literature[0].title)
                        var cnt = 0;
                        for(let i = 0; i < successResponse.data.authorLen;++i) {
                            this.tepSearch[cnt] = successResponse.data.authors[i];
                            this.tepSearch[cnt].value = this.tepSearch[cnt].name;
                            this.tepSearch[cnt].type = "专家";
                            cnt++;
                        }
                        for(let i = 0; i < successResponse.data.litlen;++i){
                            this.tepSearch[cnt] = successResponse.data.literature[i];
                            this.tepSearch[cnt].value = this.tepSearch[cnt].title;
                            this.tepSearch[cnt].type = "文献";
                            cnt++;
                        }
                        console.log(this.tepSearch);
                        cb(this.tepSearch);
                        //arr.map(obj => {return obj.name}
                    })
                    .catch(failResponse => {
                        console.log(failResponse);
                    });
                // var result = ;
                // cb(result)
            },//cb返回的建议集
            chooseTitle(){
                return(tepSearch)=>{
                    return tepSearch.title
                }
            },
            search(){
                this.keyword = this.input;
                this.$router.push({
                    name: 'searchresult',
                    params:{
                        keyword:this.keyword
                    }
                });
            },
            handleSelect(item){
                console.log(item);
            },


        },


        components: {
            Navigator,
        },

    }
</script>
