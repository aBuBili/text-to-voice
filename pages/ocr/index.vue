<template>
	<view class="ocr">
		<view class="iconBox" @click="getPhoto('camera')">
			<image src="../../static/cramer.png" class="choiceIcon" ></image>
		</view>
		<view class="iconBox" @click="getPhoto('album')">
			<image src="../../static/photo.png" class="choiceIcon"></image>
		</view>

		<canvas canvas-id="myCanvas" :style="{width: screenWidth +'px',height:'1200px'}" class="hiddenCanvas"> </canvas>
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
				imageSrc: '',
				screenWidth: 0,
			}
		},
		onShow() {
			uni.getSystemInfo({
				success: (res) => {
					this.screenWidth = res.screenWidth;
					console.log(this.screenWidth, 'this.screenWidth');
				}
			})
		},
		methods: {
			getPhoto(type) {
				const _ = this
				uni.chooseImage({
					count: 1, // 1张图片
					sourceType: [type], //拍照或者相册
					crop: {
						quality: 10
					},
					success: async function(res) {
						_.crop(res)
					}
				});
			},
			crop(res) {
				const _ = this
				const ctx = uni.createCanvasContext('myCanvas')

				// 获取图片信息
				uni.getImageInfo({
					src: res.tempFilePaths[0],
					success: function(image) {

						const w = _.screenWidth
						const h = Math.floor(image.height / (image.width / w))

						ctx.drawImage(image.path, 0, 0, w, h)
						ctx.draw(false, () => {
							// 裁剪出来
							uni.canvasToTempFilePath({
								x: 0,
								y: 0,
								width: w,
								height: h,
								destWidth: w,
								destHeight: h,
								canvasId: 'myCanvas',
								success: function(res) {
									//  转base64
									pathToBase64(res.tempFilePath)
										.then(
											base64 => {
												setBase64(base64)
												// 去翻译
												uni.navigateTo({
													url: `./translate?path=${image.path}&width=${image.width}`,
												})
											})

								},
								fail: function(res) {
									console.log(res);
								}
							}, _)
						})
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ocr {
		height: 100vh;
		background-color: #383838;
		padding-top: 20%;
	}

	.cameraBtn {
		margin-top: 120upx;
	}

	.hiddenCanvas {
		position: fixed;
		top: 1300px;
		left: 1000px
	}

	.iconBox {
		width: 280px;
		height: 200px;
		background-color: #fff;
		border-radius: 32px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 40px auto;
	}

	.choiceIcon {
		width: 160upx;
		height: 160upx;
	}
</style>
