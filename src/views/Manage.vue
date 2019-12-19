<template>
    <el-main style="padding-top: 0;">
        <Navigator />
        <div class="totalDiv">
            <div class="infoCardDiv">
                <el-card shadow="hover" style="height: 400px;width: 640px">
                    <OthersCard :user="this.user" />
                </el-card>
            </div>

            <div class="followDiv"></div>
        </div>
    </el-main>
</template>

<script>
    import Navigator from "@/components/Navigator.vue";
    import url from "@/assets/pic1.png";
    import OthersCard from "../components/OthersCard";
    import { dateFormat } from "../assets/js/time";


    export default {
        name: "Manage",
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
            },
        },
        components: {
            Navigator
        }
    };
</script>
<style>
    .totalDiv {
    }
    .infoCardDiv {
        float: left;
        margin-top: 50px;
    }
    .followDiv {
        float: left;
        margin-left: 100px;
        margin-top: 50px;
    }
</style>
