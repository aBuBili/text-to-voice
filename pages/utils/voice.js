var audio = ''
var access_token = ''
var per = 0 //朗读者 默认是小美

// 12元/万次

// 获取token
function getVoiceToken() {
	// 语音合成项目的key和密钥
	const appKey = '7Bm6Lj5hgVNdC3UTRG2jBmCM'
	const appSecret = 'gxGGih19NRI8OAxiemPxdhQ1v9onDYxZ'
	// 获取 token
	uni.request({
		url: `https://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials&client_id=${appKey}&client_secret=${appSecret}`,
		success: (res) => {
			access_token = res.data.access_token
		}
	})
}

// 播放音频
function play({
	content,
	loadEndBack,
	playEndBack
}) {
	audio = uni.createInnerAudioContext(); // 音频对象
	audio.loop = false //播放结束不循环播放 未生效

	// 生成 获取音频的url和参数
	const url = ''
	const params = [`tok=${access_token}`,
		`tex=${encodeURIComponent(content || '您还没有输入文字')}`, 'spd=5',
		'put=5', 'vol=5', 'per=' + per, 'ctp=1', 'lan=zh', 'aue=3', 'cuid=abuuio'
	]

	audio.src = `https://tsn.baidu.com/text2audio?${params.join('&')}`

	// 加载完成
	audio.onCanplay(() => {
		console.log('加载音频完成')
		audio.play()
		loadEndBack()
	})

	// 自然播放结束
	audio.onEnded(() => {
		console.log('播放结束')
		audio.destroy() //销毁 因为有继续自动播放的bug
		playEndBack()
	})
}

// 暂停
function pause() {
	audio.pause()
}

// 继续播放
function continuePlay() {
	audio.play()
}

// 销毁
function destory() {
	audio.destroy()
}

// 更改朗读者
function changeSpeaker(val) {
	per = val
}

module.exports = {
	getVoiceToken,
	play,
	pause,
	continuePlay,
	destory,
	changeSpeaker,
	speaker: per
}
