<template>

	<div class="changeName">

			<div>
				<el-input type="text" v-model="changeNameVo.NewUsername" placeholder="请输入新的用户名"/></div><br/>

			<el-button type="primary" @click="change">确认修改</el-button>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				changeNameVo: {
					NewUsername: '',
				},
				responseResult: [],
				name: '',
			}
		},
		methods: {
			change() {
				this.$axios
					.get('usercenter/changeUsername', {
						params: {
							oldUsername: this.$store.state.user.username,
							newUsername: this.changeNameVo.NewUsername,
						}
					})
					.then(successResponse => {
						console.log(successResponse)
						this.responseResult = JSON.stringify(successResponse.data);
						if (successResponse.data.code === 200) {
							window.sessionStorage.setItem("username", this.changeNameVo.NewUsername);
							this.$store.state.user.username = this.changeNameVo.NewUsername;
							this.$notify({
								title: '成功',
								message: '修改成功！',
								type: 'success'
							});
							this.$router.push('/')
						}else {
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
</script>

<style>
	.changeName {
		text-align: center;
		padding: 100px 120px;
	}

	.changeName input {
		display: block;
		height: 45px;
		width: 360px;
		line-height: 40px;
		outline: none;
		border: 1px solid #888;
		box-sizing: border-box;
	}

</style>
