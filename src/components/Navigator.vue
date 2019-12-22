<template>
    <div style="width: 100%;height: 80px;min-width: 900px;float: none">
        <div style="float: left;width: 150px;margin-top: 10px;height: 80px">
            <img src="@/assets/newLogo.png" class="image" style="max-height:60px; cursor: pointer" @click="ToFeed"/>
        </div>
        <div style="float: left;width: 120px;padding-top: 20px;margin-top: 10px;height: 80px">
            <el-link :underline="false" type="primary" class="ml-3">
                {{ this.currentTimeGreetings }}, {{ this.$store.state.user.username }}
            </el-link>
        </div>
        <div style="float: left;width: 8.2%;height: 80px"></div>
        <div style="float: left;width: 400px;height: 80px">
            <el-autocomplete
                    v-if="isSearch"
                    class="pt-4"
                    style="width: 400px;"
                    v-model="input"
                    :fetch-suggestions="querySearch"
                    placeholder="Search Something?"
                    :trigger-on-focus="false"
                    @select="handleSelect"
            >
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                <template slot-scope="{ item }">
                    <div style="float: left;width:250px;text-overflow:ellipsis;white-space:nowrap; overflow:hidden">
                        <strong>{{ item.value }}</strong></div>
                    <div style="float: right">{{ item.type }}</div>
                </template>
            </el-autocomplete>
        </div>
        <!--          <el-button-->
        <!--            icon="el-icon-user-solid"-->
        <!--            circle-->
        <!--            @click="ToIndex"-->
        <!--          ></el-button>-->
        <div style="width: 140px;float:right;margin-right: 0.8%;height: 80px">
            <div style="width: 90px;float:right;margin-top: 22px;height: 80px">
                <el-button @click="SignOut">Logout</el-button>
            </div>
            <div style="width: 50px;float:right; margin-top: 10px;height: 80px">
                <el-button type="text" @click="ToIndex" title="前往个人主页">
                    <el-badge
                            :value="notiNum"
                            class="Badge"
                            :max="99"
                            :hidden="hidBadge"
                    >
                        <el-avatar
                                :src="this.$store.state.user.avatarUrl"
                                :size="40"
                        />
                    </el-badge>
                </el-button>
            </div>
        </div>
        <div style="width: 100%;float:left;margin-top: -24px">
            <el-divider  style="width:100%;height:3px;margin: 0"/>
        </div>
    </div>
</template>

<script>
    import circle from "@/assets/logo.png";

    export default {
        name: "Navigator",
        data() {
            return {
                searchRecom: [],
                isSearch: "true",
                input: "",
                isNotified: true,
                circleUrl: circle,
                activeIndex: "1",
                activeIndex2: "1",
                notiNum: 0,
                hidBadge: true
            };
        },
        mounted() {
            if (this.$route.name === "searchresult" || this.$route.name === "mainresults" || this.$route.name === "expertresult") {
                this.isSearch = false;
            }
        },
        methods: {
            ToFeed() {
                this.$router.push("/feed");
            },
            ToIndex() {
                this.$router.push("/home");
            },
            SignOut() {
                this.$store.dispatch("SignOut");
                window.location.reload();
            },
            handleSelect(item) {
                console.log(item);
            },
            querySearch(queryString, cb) {
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
                        for (let i = 0; i < this.searchRecom.authorLen; i++) {
                            results[i].value = results[i].name;
                            results[i].type = "专家";
                        }
                        var results2 = this.searchRecom.literature;
                        for (let i = 0; i < this.searchRecom.litlen; i++) {
                            results2[i].value = results2[i].title;
                            results2[i].type = "文献";
                        }
                        list = results.concat(results2);
                        cb(list);
                    })
                    .catch(failResponse => {
                        console.log(failResponse);
                    });
            },
            search() {
                // var input = this.input;
                if (this.$route.name === 'searchresult') {
                    this.$route.params.keyword = this.input;
                    this.$router.go(0);
                }
                this.$router.replace({
                    name: 'searchresult',
                    params: {
                        keyword: this.input
                    }
                })
            },

        },
        computed: {
            currentTimeGreetings: () => {
                const h = new Date().getHours();
                if (h < 5) return "夜深了";
                if (h < 11) return "上午好";
                if (h < 13) return "中午好";
                if (h < 18) return "下午好";
                return "晚上好";
            }
        }
    };
</script>

<style>
    el-col {
        padding-top: 20px;
    }
</style>
