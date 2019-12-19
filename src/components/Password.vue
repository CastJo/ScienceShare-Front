<template>

	<div class="password">

			<div>
				<el-input type="password" v-model="loginInfoVo.password0" placeholder="请输入旧密码"/></div><br/>
			<div>
				<el-input type="password" v-model="loginInfoVo.password1" placeholder="请输入新密码"/></div><br/>
			<div>
				<el-input type="password" v-model="loginInfoVo.password2" placeholder="请确认新密码"/></div><br/>
			<el-button type="primary" @click="change">修改密码</el-button>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				loginInfoVo: {
					username: '',
					password0: '',
					password1: '',
					password2: '',
				},
				responseResult: [],
				name: '',
			}
		},
		methods: {
			change() {
				if (this.loginInfoVo.password1 !== this.loginInfoVo.password2) {
					this.$notify.error({
						title: '错误',
						message: '两次输入密码不同'
					});
				} else {
					this.$axios
						.get('usercenter/changePassword', {
							params: {
								username: this.$store.state.user.username,
								oldPassword: this.loginInfoVo.password0,
								newPassword: this.loginInfoVo.password1,
							}
						})
						.then(successResponse => {
							this.responseResult = JSON.stringify(successResponse.data);
							if (successResponse.data.code === 200) {
								this.$notify({
									title: '成功',
									message: '修改成功！',
									type: 'success'
								});
								this.$router.push('/index')
							}else if (successResponse.data.code === 402) {
								this.$notify.error({
									title: '错误',
									message: successResponse.data.message,
								});
							}
						})
						.catch(failResponse => {
							console.log(failResponse);
						})
				}

			}
		}
	}
</script>

<style>
	.password {
		text-align: center;
		padding: 40px 120px;
	}

	.password input {
		display: block;
		height: 45px;
		width: 360px;
		line-height: 40px;
		outline: none;
		border: 1px solid #888;
		box-sizing: border-box;
	}

</style>
