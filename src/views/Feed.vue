<template>
    <div style="width: 100%">
        <navigator></navigator>
        <div class="body">
            <div class="select-zone mt-3">
                <el-menu @select="handleSelect">
                    <el-menu-item index="1">
                        <span slot="title">关注动态</span>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <span slot="title">新发表</span>
                    </el-menu-item>
                </el-menu>
            </div>
            <div class="feed-zone">
                <news-card v-for="feed in feeds"
                           class="mt-3"
                           :key="feed.paperId"
                           :id="feed.paperId"
                           :title="feed.title"
                           :from="feed.from"
                           :event="feed.event"
                           :time="feed.time">
                </news-card>
                <news-card @click="handleClick"
                           v-for="arxiv in arxivs"
                           class="mt-3"
                           :key="arxiv.id"
                           :id="arxiv.id"
                           :title="arxiv.title"
                           from="arxiv"
                           :event="更新"
                           :time="arxiv.updated"
                >
                </news-card>
                <el-pagination
                        class="mt-3 mb-5"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        :page-size="10" layout="prev, next"
                        prev-text="上一页" next-text="下一页">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import NewsCard from "../components/NewsCard";
    import Navigator from "../components/Navigator";

    export default {
        name: "Feed",
        components: {
            Navigator,
            NewsCard
        },
        methods: {
            handleCurrentChange(val) {
                this.getFeedsPage()
                console.log(`当前页: ${val}`);
            },
            // eslint-disable-next-line no-unused-vars
            handleSelect(index, indexPath) {
                if (index == 1) {
                    this.arxiv = []
                    this.source = "mag"
                } else if (index == 2) {
                    this.feeds = []
                    this.source = "arxiv"
                }
                this.currentPage = 1;
                this.getFeedsPage();
            },
            handleClick(id) {
                window.location.href = id
            },
            ToLogin() {
                this.$router.replace({
                    path: '/login'
                })
            },
            getFeedsPage() {
                if (this.source == "mag") {
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
                }
                if (this.source == "arxiv") {
                    this.$axios
                        .get('usercenter/getArxivByPage', {
                            params: {
                                page: this.currentPage - 1
                            }
                        })
                        .then(res => {
                            this.arxivs = res.data.content
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
                }
            },
        },
        data() {
            return {
                currentPage: 1,
                source: "mag",
                feeds: [],
                arxivs: []
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
    .body {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .select-zone {
        width: 20%;
    }

    .feed-zone {
        display: flex;
        width: 75%;
        flex-direction: column;
        justify-content: center;
        align-content: center;
    }
</style>
