<template>
	<view class="content">
		<image :src="filePath" mode="widthFix" :style="{width: '100%'}" class="photo"></image>
	</view>
</template>


<script>
	import {
		ocr
	} from "../utils/ocr.js"
	export default {
		data() {
			return {
				filePath: '',
			}
		},
		onLoad(e) {
			this.filePath = e.path
			ocr(e.path)
		},
		methods: {}
	}
</script>

<style lang="scss" scoped>
	.content {
		background-color: #FAFAFA;
		height: 100vh;
	}
</style>
