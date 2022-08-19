<template>
	<view class="content">

		<view class="profileList">
			<view class="profile" :class="{'activePro pro0':speaker == 0}" @click="onChangeSpeak(0)">
				<image src="../../static/profile-2.png">
				</image>
				<view>小美</view>
			</view>
			<view class="profile" :class="{'activePro pro1':speaker == 1}" @click="onChangeSpeak(1)">
				<image src="../../static/profile-4.png">
				</image>
				<view>小宇</view>
			</view>
			<view class="profile" :class="{'activePro pro3':speaker == 3}" @click="onChangeSpeak(3)">
				<image src="../../static/profile-3.png">
				</image>
				<view>逍遥</view>
			</view>
			<view class="profile" :class="{'activePro pro4':speaker == 4}" @click="onChangeSpeak(4)">
				<image src="../../static/profile-1.png">
				</image>
				<view>丫丫</view>
			</view>
		</view>

		<view class="whiteBox">
			<textarea v-model="content" class="inputArea" @blur="onEditArea()" placeholder="请输入要读的文字" />
			<view class="playBtn" @click="submit()">
				<image src="../../static/pauseVoice.png" class="playIcon" v-if="status == 2"></image>
				<image src="../../static/playVoice.png" class="playIcon" v-if="status == 3||status == 4"></image>
				<text class="loading" v-if="status == 5"></text>
			</view>
		</view>

	</view>
</template>


<script>
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
				content: '',
				status: 4, //2=播放中3=暂停4=播放完毕5=请求中
				speaker: 0 //朗读者
			}
		},
		onShow() {
			// 获取剪切板的文字
			uni.getClipboardData({
				success: (res) => {
					this.content = res.data || '您还没有输入文字'
					console.log(this.content);
				}
			});
		},
		methods: {
			// 点击播放按钮
			async submit() {
				if (this.status == 4) {
					console.log('结束或有更改 重新请求')
					this.status = 5
					play({
						content: this.content,
						loadEndBack: () => this.status = 2,
						playEndBack: () => this.status = 4
					})
				} else if (this.status == 2) {
					console.log('播放状态 去暂停')
					pause()
					this.status = 3
				} else if (this.status == 3) {
					console.log('暂停状态 去播放')
					continuePlay()
					this.status = 2
				}
			},
			// 更改输入框的内容 重新获取音频
			onEditArea() {
				destroy()
				this.status = 4
			},
			// 更改朗读的人
			onChangeSpeak(val) {
				changeSpeaker(val)
				this.speaker = val
				this.status = 4
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		background-color: #FAFAFA;
		height: 100vh;
	}

	.profileList {
		padding-left: 30upx;
		padding-top: 240upx;
		display: flex;
		align-items: center;
		transition: all .2s;
	}

	.profile {
		border: 2px solid #FAFAFA;
		display: flex;
		flex-direction: column;
		align-items: center;
		opacity: 0.4;
		padding: 10upx 30upx;
	}

	.activePro {
		border-radius: 16upx;
		transition: all .2s;
		opacity: 1;
		padding: 10upx 30upx;
	}

	.pro0 {
		border: 2px solid #eab6b4;
	}

	.pro1 {
		border: 2px solid #acd7f3;
	}

	.pro3 {
		border: 2px solid #afd3b1;
	}

	.pro4 {
		border: 2px solid #f5d284;
	}

	.profile image {
		width: 100upx;
		height: 100upx;
	}

	.profile view {
		font-size: 20upx;
		color: #707070;
		margin-top: 10upx;
	}

	.whiteBox {
		margin-top: 50upx;
		background-color: #fff;
		border-radius: 60upx;
		padding: 40upx;
	}

	.inputArea {
		background-color: #F4F4F4;
		color: #A6A6A6;
		font-size: 32upx;
		border-radius: 48upx;
		width: calc(100% - 64upx);
		height: 418upx;
		padding: 32upx;

		font-size: 28upx;
	}

	.playBtn {
		width: 320upx;
		height: 160upx;
		background-color: #383838;
		border-radius: 240upx;
		margin: 120upx auto;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.playIcon {
		width: 64upx;
		height: 64upx;
	}

	// loading
	.loading {
		width: 80upx;
		display: flex;
		align-items: center;
		position: relative;
		margin: auto;

		@mixin baseCyl() {
			position: absolute;
			width: 16upx;
			background-color: #fff;
			border-radius: 8upx;
			animation: change 0.2s infinite alternate;
		}

		&::before {
			@include baseCyl();
			content: "";
			left: 50upx;
		}

		&::after {
			@include baseCyl();
			content: "";
			left: 20upx;
			animation-delay: 0.2s;
		}

		@keyframes change {
			0% {
				height: 16px;
			}

			100% {
				height: 6px;
			}
		}
	}
</style>
