<template>
    <div class="userInfoDiv">
        <div class="nameEnCollege">
            <div>
                <h5>{{ this.part.title[0]}}</h5>
<!--                <span>{{ this.part.authors[0] }}</span>-->
            </div>
            <el-divider style="margin: 12px" />
        </div>

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
        height: 120px;
    }

    .userInfoDiv div {
        float: left;
    }

    .nameEnCollege {
        margin-left: 10px;
        height: 120px;
    }

    .nameEnCollege div {
        float: none;
    }

</style>
