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
                </el-autocomplete>
            </el-col>
        </el-row>
        <el-row style="margin: auto;max-width: 1000px;">
            <el-col :span="16">
                <el-tabs v-model="activeName" @tab-click="handleClick" style="min-width: 900px;margin: auto;">
                    <el-tab-pane label="Experts" name="expertresult">
                        <router-view></router-view>
                    </el-tab-pane>
                    <el-tab-pane label="Literature" name="mainresults">
                        <el-card class="mid-center" style="max-width: 1000px;margin:auto;">
                        <router-view></router-view>
                    </el-card></el-tab-pane>
                    <el-tab-pane label="Users" name="userresult">
                        <router-view></router-view>
                    </el-tab-pane>
                </el-tabs>

            </el-col>
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
            console.log(this.keyword);
            this.$router.push({
                name: 'expertresult',
                params:{
                    keyword:this.keyword
                }
            });
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
                        console.log(successResponse.data);
                        var result = successResponse.data
                        this.tepSearch = successResponse.map(obj => obj.title);
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
            querySearch(queryString, cb){
                var list = [{}];
                this.$axios
                    .get("litcenter/getBoth", {
                        params: {
                            params: queryString
                        }
                    })
                    .then(successResponse => {
                        // console.log(successResponse.data);
                        this.searchRecom = successResponse.data;
                        var results = this.searchRecom.authors;
                        for(let i=0;i<this.searchRecom.authorLen;i++){
                            results[i].value = results[i].name;
                        }
                        var results2 = this.searchRecom.literature;
                        for(let i=0;i<this.searchRecom.litlen;i++){
                            results2[i].value = results2[i].title;
                        }
                        list = results.concat(results2);
                        cb(list);
                    })
                    .catch(failResponse => {
                        console.log(failResponse);
                    });
            },


        },


        components: {
            Navigator,
        },

    }
</script>
