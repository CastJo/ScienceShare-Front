<template>
    <div>
        <el-row>
            <el-col :span="16">
                <el-menu
                        :default-active="activeIndex"
                        @select="handleSelect"
                        class="el-menu-demo pt-1"
                        mode="horizontal"
                >
                    <el-menu-item index="1">我的主页</el-menu-item>
                    <el-menu-item index="2">我的文献</el-menu-item>
                    <el-menu-item index="3">我的关注</el-menu-item>
                    <el-badge class="item" is-dot>
                        <el-menu-item index="4">消息中心</el-menu-item>
                    </el-badge>
                        <el-menu-item index="5">注销</el-menu-item>

                </el-menu>
            </el-col>
            <el-col :offset="2" :span="4">
                <el-button @click="ToIndex" title="前往个人主页" type="text">
                    <el-badge :hidden='hidBadge' :max="99" :value="notiNum" class="Badge">
                        <el-avatar :size="50" :src="avatarUrl"></el-avatar>
                    </el-badge>
                </el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {delCookie} from '../assets/js/cookie.js'
    import circle from "@/assets/logo.png";

    export default {
        name: "Navigator",
        data() {
            return {
                input: '',
                circleUrl: circle,
                activeIndex: "1",
                activeIndex2: "1",
                avatarUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
            };
        },
        methods: {
            ToIndex() {

                this.$router.push(
                    '/index'
                )

            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
                switch (key) {
                    case "1":
                        console.log("yes");
                        this.$router.push(
                            '/main'
                        );
                        break;
                    case "5":
                        delCookie('username');
                        this.$store.dispatch('quit');
                        this.$router.replace('/login');
                        break;
                    default:
                        break;
                }
            }
        }
    };
</script>

<style>
    el-menu-item {
        max-height: 30px;
    }
</style>
