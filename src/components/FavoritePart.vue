<template>
    <div class="userInfoDiv">
        <div class="nameEnCollege">
            <div>
                <h5>文章标题：{{ this.part.tittle }}</h5>
                <span>作者：{{ this.part.authors[0] }}</span>
            </div>
        </div>
        <el-divider style="margin: 12px" />
    </div>
</template>

<script>
    export default {
        name: "FavoritePart",
        props: ["part"]
    };
</script>

<style scoped>
    .userInfoDiv {
        height: 60px;
    }

    .userInfoDiv div {
        float: left;
    }

    .nameEnCollege {
        margin-left: 10px;
        width: 170px;
        height: 60px;
    }

    .nameEnCollege div {
        float: none;
    }

    .CheckButton {
        padding-top: 15px;
        height: 60px;
    }
</style>
