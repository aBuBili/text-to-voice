var ocr_token = ''
var filePath = ''

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


function setFile(image) {
	file = urlTobase64(image)
}

function ocr(url) {
	console.log(filePath)
	uni.request({
		url:filePath,
		method: 'GET',
		responseType: 'arraybuffer',
		success: res => {
			let base64 = 'data:image/jpeg;base64,' + uni.arrayBufferToBase64(res
			.data); //把arraybuffer转成base64
			console.log(base64)

			uni.request({
				url: `https://aip.baidubce.com/rest/2.0/ocr/v1/general?access_token=${ocr_token}`,
				header: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				method: 'POST',
				data: {
					image: base64,
					detect_direction: true,
					paragraph: true,
					vertexes_location: true,
				},
				success: (res) => {
					console.log(res)
				}
			})
		},
		fail:res=>{
			console.log(res)
		}
	});
}

function setFilePath(path) {
	filePath = path
}


module.exports = {
	getOcrToken,
	ocr,
	setFilePath
}
