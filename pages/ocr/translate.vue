<template>
	<view class="content">
		<image :src="imagePath" mode="widthFix" :style="{width: '100%'}" class="photo"></image>
		<view class="" v-for="(d,index) of list" :key="index">
			<view class="char" :style="{top: d.top , left: d.left,width: d.width,height: d.height}">
				{{ d.words }}
			</view>
		</view>
	</view>
</template>


<script>
	import {
		ocr
	} from "../utils/ocr.js"

	export default {
		data() {
			return {
				imagePath: '',
				imageWidth: 390,
				list: []
			}
		},
		onLoad(e) {
			console.log('onLoad')
			this.imagePath = e.path
			this.imageWidth = parseInt(e.width)

			this.getResult()
		},
		methods: {
			async getResult() {
				console.log('getResult');
				const {
					words_result = []
				} = await ocr()

				// 处理结果数据 *2转换upx
				const a = words_result.map(e => {
					const item = {
						words: e.words,
						top: e.location.top + 'upx',
						left: e.location.left + 'upx',
						width: e.location.width + 'upx',
						height: e.location.height + 'upx',
					}
					return item
				})
				this.list.splice(0, 0, ...a)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		background-color: #FAFAFA;
		height: 100vh;
	}

	.char {
		position: absolute;
	}
</style>
