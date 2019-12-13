<template>
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
        <el-badge>
            <el-menu-item index="5">注销</el-menu-item>
        </el-badge>
    </el-menu>
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
                activeIndex2: "1"
            };
        },
        methods: {
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
