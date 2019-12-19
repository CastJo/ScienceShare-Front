<template>
    <div>
        <el-avatar :src="this.part.avatarUrl" class="avatar" :size="50"/>
        <span>{{ this.part.username }}</span>
        <span>{{ this.part.username }}</span>
    </div>
</template>

<script>
    export default {
        name: "FollowPart",
        data() {
            return {}
        },
        props: ['part',
        ]
    }
</script>

<style scoped>

</style>
