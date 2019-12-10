<template>
  <el-main>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-card
          v-for="item in Twitters"
          :key="item"
          class="my-2 ml-4"
          style="max-height:220px"
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
        <el-card class="my-2 mx-4" style="max-height:220px ">
          <img
            src="@/assets/pic1.png"
            class="image"
            style="max-height:110px; "
          />
          <div class="pa-2">
            <span>晚上好, Huu.</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
export default {
  data () {
    return {
      Twitters: [
        {
          title: "操作系统",
          content:
            "操作系统是管理计算机硬件与软件资源的计算机程序，同时也是计算机系统的内核与基石。操作系统需要处理如管理与配置内存、决定系统资源供需的优先次序、控制输入设备与输出设备、操作网络与管理文件系统等基本事务。操作系统也提供一个让用户与系统交互的操作界面。",
          likes: 9
        },
        {
          title: "操作系统",
          content:
            "操作系统是管理计算机硬件与软件资源的计算机程序，同时也是计算机系统的内核与基石。操作系统需要处理如管理与配置内存、决定系统资源供需的优先次序、控制输入设备与输出设备、操作网络与管理文件系统等基本事务。操作系统也提供一个让用户与系统交互的操作界面。",
          likes: 9
        },
        {
          title: "操作系统",
          content:
            "操作系统是管理计算机硬件与软件资源的计算机程序，同时也是计算机系统的内核与基石。操作系统需要处理如管理与配置内存、决定系统资源供需的优先次序、控制输入设备与输出设备、操作网络与管理文件系统等基本事务。操作系统也提供一个让用户与系统交互的操作界面。",
          likes: 9
        }
      ]
    };
  },
  components: {},
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
    }
  }
};
</script>

<style></style>
