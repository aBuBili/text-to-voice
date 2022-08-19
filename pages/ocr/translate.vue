<template>
	<view class="ocr">
		<view id="container"></view>
	</view>
</template>

<script>
	import Konva from "konva"
	export default {
		data() {
			return {}
		},
		onLoad(e) {
			console.log(Konva) 
			// var width = window.innerWidth;
			// var height = window.innerHeight;

			var stage = new Konva.Stage({
				container: 'container',
				width: '200px',
				height: '200px'
			});

			var layer = new Konva.Layer();

			var rect1 = new Konva.Rect({
				x: 20,
				y: 20,
				width: 100,
				height: 50,
				fill: 'green',
				stroke: 'black',
				strokeWidth: 4
			});
			// add the shape to the layer
			layer.add(rect1);
			// add the layer to the stage
			stage.add(layer);
		},
		methods: {

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
