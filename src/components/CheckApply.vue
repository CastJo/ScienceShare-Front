<template>
    <div>
        <el-card shadow="hover" class="mt-5">
            <span>审核申请</span>
            <div class="checkApply">
                <ul
                        class="infinite-list"
                        style="overflow:auto;list-style: none;padding: 0 0 0 0; max-height: 400px"
                >
                    <li
                            v-for="i in applys"
                            class="infinite-list-item"
                            :key="i.authorId"
                    ><el-tooltip
                            class="item"
                            effect="light"
                            :content=i.content
                            placement="top"
                    >
                        <ApplyPart :part="i"/>
                    </el-tooltip>
                    </li>
                </ul>
            </div>
        </el-card>
    </div>
</template>

<script>
    import ApplyPart from "./ApplyPart";
    export default {
        name: "checkApply",
        components: {ApplyPart},
        data() {
            return {
                applys: [],
            };
        },
        created() {
            this.getApplys();
        },
        mounted() {
            console.log(this.username);
        },
        computed: {
            user: {
                get() {
                    return this.$store.state.user;
                }
            }
        },
        methods: {
            handleClickAvatar(val) {
                this.$router.push(`/index/${val}`);
                if (this.username !== this.$store.state.user.username) {
                    window.location.reload();
                    window.location.reload();
                }
            },
            getApplys() {
                this.$axios
                    .get("usercenter/allApplication")
                    .then(res => {
                        if (res.data != null) {
                            this.applys = res.data;
                        }
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
            },
        },
        props: {
            username: String
        }
    };
</script>

<style scoped>
    .checkApply {
        /* height: 500px; */
        padding-top: 10px;
    }
</style>
