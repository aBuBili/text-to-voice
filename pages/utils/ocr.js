var ocr_token = ''
var base64 = ''

// 获取token
function getOcrToken() {
	// ocr的key和密钥
	const appKey = 'V3toEXP0kQytPUsVFfHH2Vej'
	const appSecret = 'aQ6cLYsqBHHFSRE6f6YOGbRwT46YUgcL'
	// 获取 token
	uni.request({
		url: `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${appKey}&client_secret=${appSecret}`,
		success: (res) => {
			ocr_token = res.data.access_token
			console.log('ocr_token', ocr_token)
		}
	})
}

// 设置图片base64
function setBase64(str) {
	console.log('setBase64')
	base64 = str
}

// ocr
function ocr() {
	console.log('ocr')
	return new Promise(function(resolve, reject) {
		uni.request({
			url: `https://aip.baidubce.com/rest/2.0/ocr/v1/general?access_token=${ocr_token}`,
			header: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			method: 'POST',
			data: {
				image: encodeURI(base64),
				detect_direction: true, // 检测图像朝向
				// paragraph: true,
				// vertexes_location: true, //返回文字外接多边形顶点位置
			},
			success: (res) => {
				console.log(res)
				resolve(res.data)
			},
			fail: res => {
				console.log(res)
				reject()
			}
		})
	})

}

function setFilePath(path) {
	filePath = path
}


module.exports = {
	getOcrToken,
	ocr,
	setBase64
}
