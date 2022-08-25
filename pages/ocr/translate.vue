<template>
	<view class="content">
		<image :src="imagePath" mode="widthFix" :style="{width: '100%'}" class="photo"></image>
		<view class="" v-for="(d,index) of list" :key="index">
			<view class="char" :style="{top: d.top , left: d.left,width: d.width,height: d.height}"
				@click="toPlay(d.words)">
			</view>
		</view>
	</view>
</template>


<script>
	import {
		ocr
	} from "../utils/ocr.js"

	import {
		play,
		pause,
		continuePlay,
		destroy,
		changeSpeaker,
		speaker
	} from "../utils/voice.js"

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
			this.getOcrResult()
		},
		methods: {
			async getOcrResult() {
				console.log('getResult');
				const {
					words_result = []
				} = await ocr()

				// 处理结果数据 转换upx
				const a = words_result.map(e => {
					const item = {
						words: e.words,
						top: e.location.top + 'px',
						left: e.location.left + 'px',
						width: e.location.width + 'px',
						height: e.location.height + 'px',
					}
					return item
				})
				this.list.splice(0, 0, ...a)
			},
			toPlay(text) {
				play({
					content: text
				})
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
		background-color: rgba(#6355FF, 0.2);
		border: 1px solid #6355FF;
		border-radius: 4upx;
	}
</style>
