<template>
	<view class="ocr">
		<button @click="getPhoto('camera')" class="cameraBtn">拍照</button>
		<button @click="getPhoto('album')" class="cameraBtn">从相册选择</button>

		<canvas :style="{width:'390px',height:'4000px'}" canvas-id="firstCanvas" id="firstCanvas"></canvas>
	</view>
</template>

<script>
	import {
		setBase64
	} from "../utils/ocr.js"
	import {
		pathToBase64
	} from "../utils/base64.js"
	export default {
		data() {
			return {

			}
		},
		onShow() {

		},
		methods: {
			getPhoto: (type) => {
				var ctx = uni.createCanvasContext('firstCanvas')
				uni.chooseImage({
					count: 1, //默认9
					sourceType: [type], //拍照
					crop: {
						quality: 10
					},
					success: async function(res) {

						// 转base64
						await pathToBase64(res.tempFilePaths[0]).then(base64 => {
							setBase64(base64)
						})

						// 获取图片信息
						uni.getImageInfo({
							src: res.tempFilePaths[0],
							success: function(image) {
								// console.log(image)
								uni.navigateTo({
									url: `./translate?path=${image.path}&width=${image.width}`,
								})
							}
						});

					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.ocr {
		height: 100%;
	}

	.cameraBtn {
		margin-top: 120upx;
	}
</style>
