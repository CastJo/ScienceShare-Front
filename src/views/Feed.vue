<template>
    <el-main style="padding-top: 0;">
        <navigator/>
        <div class="feedzone">
            <news-card v-for="feed in feeds"
                       class="mt-3"
                       :key="feed.paperId"
                       :id="feed.paperId"
                       :title="feed.title"
                       :from="feed.from"
                       :event="feed.event"
                       :time="feed.time">
            </news-card>
            <el-pagination
                    clss="mt-3"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="10" layout="prev, next"
                    prev-text="上一页" next-text="下一页">
            </el-pagination>
        </div>
    </el-main>
</template>

<script>
    import NewsCard from "../components/NewsCard";
    import Navigator from "../components/Navigator";

    export default {
        components: {
            Navigator,
            NewsCard
        },
        methods: {
            handleCurrentChange(val) {
                this.getFeedsPage()
                console.log(`当前页: ${val}`);
            },
            ToLogin() {
                this.$router.replace({
                    path: '/login'
                })
            },
            getFeedsPage() {
                console.log(this.$store.state.user.username)
                console.log(this.currentPage)
                this.$axios
                    .get('usercenter/getFeedsByPage', {
                        params: {
                            username: this.$store.state.user.username,
                            page: this.currentPage
                        }
                    })
                    .then(res => {
                        this.feeds = res.data
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            },
        },
        data() {
            return {
                currentPage: 1,
                feeds: [],
            };
        },
        created() {
            this.getFeedsPage();
            console.log(this.feeds)
        },
        mounted() {
            if (this.$store.state.user.username == null) {
                this.$router.push("/");
            }
        },
    };
</script>

<style>
    .feedzone {
        width: 100%;
    }
</style>
