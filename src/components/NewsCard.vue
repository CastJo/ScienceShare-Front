<template>
    <div>
        <el-card shadow="hover" class="outPost" @click.native="ToContent">
            <div class="news"> {{this.news}} </div>
            <div class="title"> {{this.title}} </div>
            <div class="time"> {{this.formattedTime}} </div>
        </el-card>
    </div>
</template>

<script>
    import {
        dateFormat
    } from "../assets/js/time.js";

    export default {
        name: "NewsCard",
        data() {
            return {
            }
        },
        methods: {
        },
        created() {
        }
        ,
        computed: {
            news() {
                if (this.event === "收藏") {
                    return this.from + " 收藏了 文献"
                } else {
                    return this.from + " 更新了 文献"
                }
            },
            formattedTime() {
                return dateFormat(this.time);
            }
            ,
        }
        ,
        props: [
            'id',
            'title',
            'from',
            'event',
            'time'
        ]
    }
</script>

<style>
    .news {
        font-size: 10px;
    }
    .title {
        margin-top: 10px;
        font-size: 20px;
        margin-bottom: 10px;
    }
    .time {
        font-size: 10px;
        margin-right: 2px;
    }
</style>
