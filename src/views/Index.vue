<template>
    <el-main style="padding-top: 0;">
        <Navigator/>
        <div class="totalDiv">
            <div class = "infoCardDiv">
                <el-card shadow="hover" style="height: 400px;width: 640px">

                    <OthersCard :user="this.user"/>
                </el-card>
            </div>

            <div class = "followDiv"><Follow :user="this.user"/></div>
        </div>
    </el-main>

</template>

<script>
    import Navigator from "@/components/Navigator.vue";
    import Follow from "../components/Follow";
    import url from "@/assets/pic1.png";
    import {dateFormat} from "../assets/js/time";
    import OthersCard from "../components/OthersCard";

    export default {
        name: "Index",
        data() {
            return {
                user: '',
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
            if (this.$route.params.username === this.$store.state.user.username)
                this.$router.push('/home');
            this.$axios.get(`usercenter/getUser`,{
                params: {
                    username: this.$route.params.username,
                }
            }).then((response) => {
                this.user = response.data;
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
            OthersCard,
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
