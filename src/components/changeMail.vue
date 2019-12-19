<template>

	<div class="newMailZone">

		<div class="mailZone">
			<el-input type="text" v-model="loginInfoVo.newEmail" placeholder="请输入新的邮箱"/>
		</div><br/>

		<div class = "codeZone">
			<div>
				<el-input type="text" v-model="loginInfoVo.code" placeholder="请输入验证码"/></div>
			<div>
			<el-button
				:disabled="inputed"
				@click="sendPin"
				class="MailbottomControl"
				name="codeButton"
				type="primary"
				plain
			><span v-if="inputed">{{ this.auth_time }}</span>
				<span v-else>获取验证码</span>
			</el-button></div></div>

		<div class="changeMailBottonZone">
			<el-button class="changeMailBotton" type="primary" @click="changeMail">确认修改</el-button></div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				loginInfoVo: {
					newEmail: '',
					code: '',
				},
				responseResult: [],
				name: '',
				inputed:false,
				auth_time: "",
				valid_time: "",
				code: ""
			}
		},
		methods: {
			sendPin() {
				this.$axios
						.get("usercenter/sendPin", {
							params: {
								emailAddress: this.loginInfoVo.newEmail
							}
						})
						.then(response => {
							if (this.loginInfoVo.newEmail === "") {
								this.$notify.error({
									title: "错误",
									message: "请输入邮箱"
								});
							}
							else if (response.data.code === 305) {
								this.$notify.error({
									title: "错误",
									message: "邮箱不合法"
								});
							} else if (response.data.code === 306) {
								this.$notify.error({
									title: "错误",
									message: "邮箱已被注册"
								});
							} else if (response.data.code === 200) {
								this.code = response.data.message;
								this.emailAddress = this.loginInfoVo.emailAddress;
								this.inputed = true;
								this.$notify({
									title: "成功",
									message: "验证码已发送",
									type: "success"
								});
								this.auth_time = 60;
								this.valid_time = 300;
								var auth_timetimer = setInterval(() => {
									this.auth_time--;
									this.valid_time--;
									if(this.auth_time <= 0){
										this.inputed = false;
									}
									if (this.valid_time <= 0) {
										this.code = "";
										clearInterval(auth_timetimer);
									}
								}, 1000);
							}
						})
						.catch(function(error) {
							console.log(error);
						});
			},
			changeMail(){
				if (this.code !== this.loginInfoVo.code) {
					this.$notify.error({
						title: "错误",
						message: "验证码有误或已过期"
					});
				} else if (this.loginInfoVo.newEmail === "") {
					this.$notify.error({
						title: "错误",
						message: "请输入邮箱"
					});
				}
				this.$axios
					.get("usercenter/changeMail", {
					params: {
						username: this.$store.state.user.username,
						mail: this.loginInfoVo.newEmail
					}
				})
				.then(response =>{
					if(response.data.code === 200) {
						this.code = "";
						window.sessionStorage.setItem("emailAddress", this.loginInfoVo.newEmail);
						this.$store.state.user.emailAddress = this.loginInfoVo.newEmail;
						this.$notify({
							title: "成功",
							message: "邮箱修改成功！",
							type: "success"
						});
						this.$router.push('/')
					}
				})


			}
		}
	}
</script>

<style>
	.newMailZone{
		padding: 80px 120px;
	}
	.newMailZone div{
		float: top;
	}
	.codeZone div{

		float: left;
	}
	.codeZone{
		height: 45px;
		width: 360px;
		text-align: center;
	}

	.mailZone {
		height: 45px;
		width: 360px;
		text-align: center;
	}

	.mailZone input {
		display: block;
		height: 45px;
		width: 360px;
		line-height: 40px;
		outline: none;
		border: 1px solid #888;
		box-sizing: border-box;
	}

	.codeZone input {
		display: block;
		height: 45px;
		width: 250px;
		line-height: 40px;
		outline: none;
		border: 1px solid #888;
		box-sizing: border-box;
	}
	.MailbottomControl{
		height: 45px;
		width: 100px;
		margin-left: 10px;
		padding: 0;
	}

	.changeMailBotton{
		height: 45px;
		width: 100px;
		margin-left: 10px;
		padding: 0;
	}

	.changeMailBottonZone{
		text-align: center;
		margin-top: 20px;
	}

</style>
