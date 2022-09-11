<template>
	<view class="content">
		<image :src="imagePath" mode="widthFix" :style="{width: '100%',marginBottom: '280px'}"></image>
		<view class="" v-for="(d,index) of list" :key="index">
			<view :class="selectPid == d.pid ?'char active':'char'"
				:style="{top: d.top , left: d.left,width: d.width,height: d.height}" @click="toPlay( d.pid)">
			</view>
		</view>

		<view class="playBtn" @click="toPauseAPlay()">
			<image src="../../static/pauseVoice.png" class="playIcon" v-if="status == 2"></image>
			<image src="../../static/playVoice.png" class="playIcon" v-if="status == 3"></image>
			<text class="loading" v-if="status == 5"></text>
			<text v-if="status == 4">૮(˶ᵔ ᵕ ᵔ˶)ა</text>
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
				list: [],

				paragraphs_result: [],
				selectPid: 9999,

				status: 4, //2=播放中3=暂停4=播放完毕5=请求中
			}
		},
		onLoad(e) {
			console.log('onLoad')
			this.imagePath = e.path
			this.imageWidth = parseInt(e.width)
			this.getOcrResult()
		},
		methods: {
			// 获取ocr结果 并且更新数据
			async getOcrResult() {
				console.log('getResult');
				const {
					words_result,
					paragraphs_result
				} = await ocr()

				this.paragraphs_result = paragraphs_result
				this.list.splice(0, 0, ...words_result)
			},
			// 点击播放按钮
			async toPlay(pid) {
				this.status = 5

				this.selectPid = pid // 渲染属于本段落的行
				let rows = this.paragraphs_result[pid].words_result_idx // 组成段落的行数数组
				let str = rows.map(e => this.list[e].words).join() // 拼接文本
				console.log('str', str);

				play({
					content: str,
					loadEndBack: () => this.status = 2,
					playEndBack: () => {
						this.status = 4
						this.selectPid = 9999 // 取消段落的选中
					}
				})
			},
			toPauseAPlay() {
				if (this.status == 2) {
					pause()
					this.status = 3
				} else if (this.status == 3) {
					console.log('暂停状态 去播放')
					continuePlay()
					this.status = 2
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		background-color: #fff;
		height: 100vh;
		position: relative;
	}

	.char {
		position: absolute;
		background-color: rgba(#6355FF, 0.2);
		border: 1px solid #6355FF;
		border-radius: 4upx;
	}

	.active {
		background-color: rgba(#EA590A, 0.2);
		border: 1px solid #EA590A;
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
		position: fixed;
		bottom: 80px;
		left: calc(50% - 160upx);
		font-size: 24px;
		color: #fff;
		box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
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
