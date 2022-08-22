<template>
	<view class="content">
		<view id="canvas">

		</view>
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
				fullHeight: '',
				fullwidth: ''
			}
		},
		onLoad(e) {
			this.filePath = e.path
			ocr(e.path)
			uni.getSystemInfo({
				success: function(res) {
					this.fullHeight = res.windowHeight + 'px';
					this.fullwidth = res.windowWidth + 'px';
				}
			})

			
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
