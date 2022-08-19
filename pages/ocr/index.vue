<template>
	<view class="ocr">
		<button @click="getPhoto('camera')" class="cameraBtn">拍照</button>
		<button @click="getPhoto('album')" class="cameraBtn">从相册选择</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		onTabItemTap(e) {
			console.log(e)
		},
		methods: {
			getPhoto: (type) => {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: [type], //拍照
					success: function(res) {
						// 获取图片信息
						uni.getImageInfo({
							src: res.tempFilePaths[0],
							success: function(image) {
								console.log(image);
								console.log(image.height);
								uni.navigateTo({
									url: `./translate?path=${image.path}`,
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
