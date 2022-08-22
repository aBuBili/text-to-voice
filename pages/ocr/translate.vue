<template>
	<view class="content">
		<image :src="filePath" mode="widthFix" :style="{width: '100%'}" class="photo"></image>
		<view class="">{{fw}}</view>
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
				fw: ''
			}
		},
		onLoad(e) {
			console.log('onLoad')
			this.filePath = e.path

			// 获取视口宽度
			uni.getSystemInfo({
				success: function(res) {
					this.fw = res.windowWidth;
				}
			})
			this.getResult()
		},
		methods: {
			getResult: async () => {
				console.log('getResult');
				const {
					words_result
				} = await ocr()
				console.log(words_result)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		background-color: #FAFAFA;
		height: 100vh;
	}
</style>
