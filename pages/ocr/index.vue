<template>
	<view class="ocr">
		<button @click="getPhoto('camera')" class="cameraBtn">拍照</button>
		<button @click="getPhoto('album')" class="cameraBtn">从相册选择</button>

		<canvas :style="{width:'390px',height:'4000px'}" canvas-id="firstCanvas" id="firstCanvas"></canvas>
	</view>
</template>

<script>
	import {
		setFilePath
	} from "../utils/ocr.js"
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
					success: function(res) {

						uni.getSystemInfo({
							success: function(win) {
								let fh = win.windowHeight;
								let fw = win.windowWidth;

								uni.getImageInfo({
									src: res.tempFilePaths[0],
									success: function(image) {

										const height = Math.floor(image.height *
											fw / image.width)
										console.log(height)

										ctx.drawImage(res.tempFilePaths[0], 0, 0,
											fw, height)
										ctx.draw()
										download(fw, height)

										uni.navigateTo({
											url: `./translate?path=${image.path}`,
										})
									}
								});


							}
						})

						// 下载压缩的图片
						function download(w, h) {
							uni.canvasToTempFilePath({
								x: 0,
								y: 0,
								width: w,
								height: h,
								destWidth: w,
								destHeight: h,
								canvasId: 'firstCanvas',
								success: function(res) {
									console.log(res.tempFilePath)
								}
							})
						}
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
