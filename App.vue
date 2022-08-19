<script>
	import {
		getVoiceToken
	} from "./pages/utils/voice.js"
	import {
		getOcrToken
	} from "./pages/utils/ocr.js"
	export default {
		onLaunch: function() {
			getVoiceToken()
			getOcrToken()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
