<template>
	<view class="content">

		<view class="profileList">
			<view class="profile" :class="{'activePro pro0':per == 0}" @click="onChangeSpeak(0)">
				<image src="../../static/profile-2.png">
				</image>
				<view>小美</view>
			</view>
			<view class="profile" :class="{'activePro pro1':per == 1}" @click="onChangeSpeak(1)">
				<image src="../../static/profile-4.png">
				</image>
				<view>小宇</view>
			</view>
			<view class="profile" :class="{'activePro pro3':per == 3}" @click="onChangeSpeak(3)">
				<image src="../../static/profile-3.png">
				</image>
				<view>逍遥</view>
			</view>
			<view class="profile" :class="{'activePro pro4':per == 4}" @click="onChangeSpeak(4)">
				<image src="../../static/profile-1.png">
				</image>
				<view>丫丫</view>
			</view>
		</view>

		<view class="whiteBox">
			<textarea v-model="content" class="inputArea" @blur="onEditArea()" placeholder="请输入要读的文字" />
			<view class="playBtn" @click="submit()">
				<image src="../../static/pauseVoice.png" class="playIcon" v-if="status == 2"></image>
				<image src="../../static/playVoice.png" class="playIcon" v-else></image>
			</view>
		</view>

	</view>
</template>


<script>
	export default {
		data() {
			return {
				content: '',
				audio: '',
				// token 有效期30天 
				access_token: "",
				isPlay: false, //当前音频是否正在播放 play|pause
				isEnd: true, //当前音频播放完毕
				per: 0, //朗读者 默认是小美

				status: 4, //2=播放中3=暂停4=播放完毕
			}
		},
		onLoad() {
			// 语音合成项目的key和密钥
			const appKey = '7Bm6Lj5hgVNdC3UTRG2jBmCM'
			const appSecret = 'gxGGih19NRI8OAxiemPxdhQ1v9onDYxZ'
			// 获取 token
			uni.request({
				url: `https://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials&client_id=${appKey}&client_secret=${appSecret}`,
				success: (res) => {
					this.access_token = res.data.access_token
				}
			})
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
					this.status = 2
					this.audio = uni.createInnerAudioContext(); // 音频对象
					this.audio.loop = false //播放结束不循环播放 未生效

					// 生成 获取音频的url和参数
					const url = ''
					const params = [`tok=${this.access_token}`,
						`tex=${encodeURIComponent(this.content || '您还没有输入文字')}`, 'spd=5',
						'put=5', 'vol=5', 'per=' + this.per, 'ctp=1', 'lan=zh', 'aue=3', 'cuid=abuuio'
					]

					this.audio.src = `https://tsn.baidu.com/text2audio?${params.join('&')}`

					// 加载完成
					this.audio.onCanplay(() => {
						console.log('加载音频完成')
						this.audio.play()
					})

					// 自然播放结束
					this.audio.onEnded(() => {
						console.log('播放结束')
						this.status = 4
						this.audio.destroy() //销毁 因为有继续自动播放的bug
					})

				} else if (this.status == 2) {
					console.log('播放状态 去暂停')
					this.audio.pause()
					this.status = 3
				} else if (this.status == 3) {
					console.log('暂停状态 去播放')
					this.audio.play()
					this.status = 2
				}
			},
			// 更改输入框的内容 重新获取音频
			onEditArea() {
				this.audio.destroy()
				this.status = 4
			},
			// 更改朗读的人
			onChangeSpeak(val) {
				this.per = val
				this.status = 4
			}
		}
	}
</script>

<style>
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
		text-align: center;
		line-height: 200upx;
		margin: 120upx auto;
	}

	.playIcon {
		width: 64upx;
		height: 64upx;
	}
</style>
