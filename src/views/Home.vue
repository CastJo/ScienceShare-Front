<template>


    <el-main style="padding-top: 0;">
        <Navigator/>
        <div class="totalDiv">
        <div class = "infoCardDiv">
            <el-card shadow="hover" style="height: 400px;width: 640px">

                    <el-menu
                            router
                            :default-active="activeIndex"
                            class="el-menu-demo"
                            mode="horizontal"
                            @select="handleSelect"
                    >
                        <el-menu-item index="/home">信息</el-menu-item>
                        <el-menu-item index="/home/changeName">修改用户名</el-menu-item>
                        <el-menu-item index="/home/changeMail">修改邮箱</el-menu-item>
                        <el-menu-item index="/home/password">修改密码</el-menu-item>
                        <el-menu-item index="/main" v-if=isAuthor>我的专家主页</el-menu-item>
                    </el-menu>

                <router-view/>
            </el-card>
        </div>

        <div class = "followDiv"><Follow :username="this.user.username"/></div>
        </div>
    </el-main>

</template>

<script>
    import Navigator from "@/components/Navigator.vue";
    import Follow from "../components/Follow";
    import url from "@/assets/pic1.png";
    import {dateFormat} from "../assets/js/time";

    export default {
        name: "Home",
        data() {
            return {
                expert: this.$store.state.expert,
                user: this.$store.state.user,
                circleUrl: url,
                activeIndex: "1",
                isAuthor:false,
            };
        },
        computed: {
            formattedDate() {
                return dateFormat(this.user.createdDate);
            }
        },
        created() {
            this.$axios.get(`usercenter/getUser`, {
                params: {
                    username: this.$store.state.user.username,
                }
            }).then((response) => {
                this.$store.dispatch("setUser",response.data);
            });
        },
        mounted() {
            if (this.$store.state.user.username == null) {
                this.$router.push("/");
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
        },
        components: {
            Follow,
            Navigator,
        }
    };
</script>
<style>
    .totalDiv{
    }
    .infoCardDiv{
        float: left;
        margin-top: 50px;
    }
    .followDiv{
        float: left;
        margin-left: 100px;
        margin-top: 50px;
    }
</style>
