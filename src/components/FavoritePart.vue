<template>
    <div class="userInfoDiv">
        <div class="nameEnCollege">
            <div style="">
                <el-button type="text" plain size="medium" style="color: black;border: white" @click="toLitInfo">
                <div style="width: 90%;display: flex;flex-wrap: wrap">
                    <h4>{{ this.part.title[0]}}</h4>
                </div></el-button>
<!--                <span>{{ this.part.authors[0] }}</span>-->
            </div>
            <el-divider style="margin: 12px" />
        </div>

    </div>
</template>

<script>
    export default {
        name: "FavoritePart",
        props: ["part"],
        methods:{
            toLitInfo(){
                this.$router.push(`/litInfo/${this.part.id}`);
            }
        }
    };
</script>

<style scoped>
    .userInfoDiv {
        margin-top: 0px;
        height: 80px;
        width: 100%;
    }

    .userInfoDiv div {
        float: left;
    }

    .nameEnCollege {
        margin-left: 10px;
        height: 120px;
        width: 100%;
    }

    .nameEnCollege div {
        float: none;
    }

</style>
