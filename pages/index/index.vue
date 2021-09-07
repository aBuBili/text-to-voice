<template>
	<view class="content">
		<p class="title"> (๑•̀ㅂ•́)و✧ </p>
		<textarea v-model="content" class="areaBox" @blur="onEditArea" placeholder="请输入要读的文字" />

		<view class="submit" @click="submit">
			<image src="../../static/pause.png" mode="" class="laba" v-if="isPlay"></image>
			<image src="../../static/play.png" mode="" class="laba" v-else></image>
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
				isEnd: true //当前音频播放完毕
			}
		},
		onLoad() {
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
			uni.getClipboardData({
				success: (res) => {
					this.content = res.data || '您还没有输入文字'
					console.log(this.content);
				}
			});
		},
		methods: {
			async submit() {
				if (this.isEnd) {
					this.isEnd = false
					this.isPlay = true
					this.audio = uni.createInnerAudioContext();
					this.audio.loop = false

					const url = ''
					const params = [`tok=${this.access_token}`, `tex=${encodeURIComponent(this.content || '您还没有输入文字')}`, 'spd=5',
						'put=5', 'vol=5', 'pre=1', 'ctp=1', 'lan=zh', 'aue=3', 'cuid=abuuio'
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
						this.isEnd = true
						this.isPlay = false
						this.audio.destroy()
					})

				} else {
					// 暂停就播放 播放就暂停
					if (this.audio.paused) {
						console.log('播放')
						this.audio.play()
						this.isPlay = true
					} else {
						console.log('暂停')
						this.audio.pause()
						this.isPlay = false
					}
				}
			},
			// 更改输入框的内容 重新获取音频
			onEditArea() {
				this.isEnd = true
				this.isPlay = false
				this.audio.destroy()
			}
		}
	}
</script>

<style>
	.content {
		padding: 16px;
	}

	.title {
		color: #333;
		font-size: 14px;
		margin: 64px 0 16px 0;
	}

	.areaBox {
		height: 320px;
		background-color: rgba(0, 0, 0, 0.04);
		border-radius: 32px;
		padding: 16px;
		font-size: 14px;
		color: #333;
	}

	.submit {
		width: 120px;
		height: 80px;
		background-color: #2C6CCB;
		border-radius: 50px;
		box-shadow: 12px 12px 24px #2C6CCB88;
		text-align: center;
		line-height: 110px;
		margin-left: calc(50% - 60px);
		margin-top: 40px;
	}

	.laba {
		width: 41px;
		height: 40px;
	}
</style>
