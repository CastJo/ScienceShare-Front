<template>
  <div>
    <el-card shadow="hover" class="mt-5" style="width: 350px">
      <span>关注者</span>
      <div class="followingPart">
        <ul
          class="infinite-list"
          style="overflow:auto;list-style: none;padding: 0 0 0 0; max-height: 400px"
        >
          <li
            v-for="i in following"
            class="infinite-list-item"
            :key="i.username"
          >
            <FollowPart :part="i" @click-avatar="handleClickAvatar" />
          </li>
        </ul>
      </div>
      <span>粉丝</span>
      <div class="followingPart">
        <ul
          class="infinite-list"
          style="overflow:auto;list-style: none;padding: 0 0 0 0; max-height: 400px"
        >
          <li
            v-for="i in followers"
            class="infinite-list-item"
            :key="i.username"
          >
            <FollowPart :part="i" @click-avatar="handleClickAvatar" />
          </li>
        </ul>
      </div>
    </el-card>
  </div>
</template>

<script>
import FollowPart from "./FollowPart";
export default {
  name: "Follow",
  components: { FollowPart },
  data() {
    return {
      following: [],
      followers: []
    };
  },
  created() {
    this.getFollowing();
    this.getFollowers();
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
    getFollowing() {
      this.$axios
        .get("usercenter/allFollowing", {
          params: {
            username: this.username,
            myUsername: this.username
          }
        })
        .then(res => {
          if (res.data != null) {
            this.following = res.data;
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    getFollowers() {
      this.$axios
        .get("usercenter/allFollowers", {
          params: {
            username: this.username,
            myUsername: this.username
          }
        })
        .then(res => {
          if (res.data !== "") {
            this.followers = res.data;
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  },
  props: {
    username: String
  }
};
</script>

<style scoped>
.followingPart {
  /* height: 500px; */
  padding-top: 10px;
}

.hotpostDivider {
  height: 3px;
  margin-bottom: 10px;
  margin-top: 10px;
}
</style>
