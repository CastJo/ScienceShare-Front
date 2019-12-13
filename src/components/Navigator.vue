<template>
    <div>
        <el-row>
            <el-col :span="8" class="pt-2">
                <img src="@/assets/pic1.png" class="image" style="max-height:60px; "/>
                <el-button type="text" class="mx-4">Home
                </el-button
                >
                <el-button type="text" class="mx-4">Questions
                </el-button
                >
                <el-button type="text" class="mx-4">Jobs</el-button>
            </el-col>
            <el-col :span="8">
                <el-input placeholder="Search Something?" v-model="input" class="pt-3">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </el-col>
            <el-col :span="8">
                <div class="pt-3" style="padding-left: 40%">
                    <el-button icon="el-icon-user-solid" circle @click="ToIndex"></el-button>
                    <el-badge :is-dot="isNotified" class="item">
                        <el-button icon="el-icon-chat-dot-round" circle></el-button>
                    </el-badge>
                    <el-button class="ml-5" @click="quit">Logout</el-button>
                </div>
            </el-col>
        </el-row>
        <el-divider class="my-2"></el-divider>
    </div>
</template>

<script>
    import {delCookie} from '../assets/js/cookie.js'
    import circle from "@/assets/logo.png";

    export default {
        name: "Navigator",
        data() {
            return {
                input: "",
                isNotified: true,
                circleUrl: circle,
                activeIndex: "1",
                activeIndex2: "1"
            };
        },
        methods: {
            ToIndex() {

                this.$router.push(
                    '/Index'
                )

            },
            quit() {
                delCookie('username');
                this.$store.dispatch('quit');
                this.$router.replace('/SignIN')
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            logout: function () {
            }
        }
    };
</script>

<style>
    el-col {
        padding-top: 20px;
    }

</style>
