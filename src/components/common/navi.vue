<template>
	<div>
		<h4>排序方式</h4>
		<el-menu default-active="activeIndex" class="el-menu-vertical-demo" @select="handleSelect">
			<el-menu-item v-for="sortby in sortbys" :key="sortby" :index="sortby">
				<i class="el-icon-setting"></i>
				<span slot="title"> {{sortby}} </span>
			</el-menu-item>
		</el-menu>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex: '1',
			};
		},
		methods: {
			handleSelect(key, keyPath) {
				this.$emit('sort-change', key)
			}
		},
		props: [
			'sortbys'
		]
	}
</script>

<style>
</style>
