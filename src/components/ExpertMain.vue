<template>
  <el-container>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-card
          v-for="item in Twitters"
          :key="item.id"
          class="my-2 ml-4"
          style="max-height:220px"
          shadow="hover"
        >
          <div slot="header" class="mb-3">
            <span style="float: left">{{ item.title }}</span>
            <el-button style="float: right; padding: 3px 0" type="text"
              >BUTTON</el-button
            >
          </div>
          <div>
            <p align="left">{{ item.content }}</p>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button type="text" class="button">操作按钮</el-button>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col class="pr-4" :span="8">
        <el-card class="my-2 mx-4" style="max-height:220px" shadow="hover">
          <img
            src="@/assets/pic1.png"
            class="image"
            style="max-height:110px; "
          />
          <div class="pa-2">
            <span
              >{{ this.currentTimeGreetings }}, {{ this.expert.name }}.</span
            >
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      expert: this.$store.state.expert,
      Twitters: [
        {
          id: "1",
          title: "操作系统",
          content:
            "操作系统是管理计算机硬件与软件资源的计算机程序，同时也是计算机系统的内核与基石。操作系统需要处理如管理与配置内存、决定系统资源供需的优先次序、控制输入设备与输出设备、操作网络与管理文件系统等基本事务。操作系统也提供一个让用户与系统交互的操作界面。",
          likes: 9
        },
        {
          id: "2",
          title: "操作系统",
          content:
            "操作系统是管理计算机硬件与软件资源的计算机程序，同时也是计算机系统的内核与基石。操作系统需要处理如管理与配置内存、决定系统资源供需的优先次序、控制输入设备与输出设备、操作网络与管理文件系统等基本事务。操作系统也提供一个让用户与系统交互的操作界面。",
          likes: 9
        },
        {
          id: "3",
          title: "操作系统",
          content:
            "操作系统是管理计算机硬件与软件资源的计算机程序，同时也是计算机系统的内核与基石。操作系统需要处理如管理与配置内存、决定系统资源供需的优先次序、控制输入设备与输出设备、操作网络与管理文件系统等基本事务。操作系统也提供一个让用户与系统交互的操作界面。",
          likes: 9
        }
      ]
    };
  },
  mounted() {
    this.$axios
      .get("ExpertRepo", {
        params: {
          name: this.$store.state.expert.name
        }
      })
      .then(successResponse => {
        var responseResult = JSON.parse(
          JSON.stringify(successResponse.data.data)
        );
        if (successResponse.data.code === 200) {
          this.Twitters = responseResult;
        } else {
          this.$notify.error({
            title: "错误",
            message: "加载错误"
          });
        }
      })
      .catch(failResponse => {
        console.log(failResponse);
      });
  },
  computed: {
    currentDate: () => {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },
    currentTimeGreetings: () => {
      const h = new Date().getHours();
      if (h < 5) return "夜深了";
      if (h < 11) return "上午好";
      if (h < 13) return "中午好";
      if (h < 18) return "下午好";
      return "晚上好";
    }
  }
};
</script>

<style></style>
