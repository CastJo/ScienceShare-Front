<template>
    <el-main style="padding-top: 0;">
        <Navigator/>
        <div class="totalDiv">
            <div class="infoCardDiv">
                <el-card shadow="always" style="height: 400px;width: 100%">
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
                        <el-menu-item index="/main" v-if="isAuthor"
                        >我的专家主页
                        </el-menu-item
                        >
                    </el-menu>
                    <router-view/>
                </el-card>
            </div>
            <div class="favEnFollow">
                <div class="favDiv">
                    <Favorite :username="this.$store.state.user.username"/>
                </div>
                <div class="followDiv">
                    <Follow :username="this.$store.state.user.username"/>
                    <Follower :username="this.$store.state.user.username"/>
                </div>
            </div>
        </div>
    </el-main>
</template>

<script>
    import Navigator from "@/components/Navigator.vue";
    import Follow from "../components/Follow";
    import url from "@/assets/pic1.png";
    import {dateFormat} from "../assets/js/time";
    import Favorite from "../components/Favorite";
    import Follower from "../components/Follower";

    export default {
        name: "Home",
        data() {
            return {
                circleUrl: url,
                activeIndex: "1",
                isAuthor: false
            };
        },
        computed: {
            formattedDate() {
                return dateFormat(this.user.createdDate);
            },
            user: {
                get() {
                    return this.$store.state.user;
                }
            }
        },
        created() {
            this.$axios
                .get(`usercenter/getUser`, {
                    params: {
                        username: this.$store.state.user.username
                    }
                })
                .then(response => {
                    this.$store.dispatch("setUser", response.data);
                });
        },
        mounted() {
            if (this.$store.state.user.isLogin === null) {
                this.$router.push("/");
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        },
        components: {
            Follower,
            Favorite,
            Follow,
            Navigator
        }
    };
</script>
<style>
    .favEnFollow {
        float: none;
        height: 500px;
        width: 100%;
    }

    .favDiv {
        width: 50%;
        margin-top: 20px;
        height: 500px;
    }

    .totalDiv {
        width: 100%;
        float: left;
    }
    .favEnFollow div{
        float: left;
    }

    .infoCardDiv {
        width: 100%;
        height: 400px;
    }

    .followDiv {
        width: 50%;
        float: right;
        child-align: right;
    }
</style>
