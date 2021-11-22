<template>
	<div id="videowrapper">
		<VideoBox id="VideoBox"/>
		<VideoControls id="VideoControls"
			@onclickPause="playPauseVid"
			@onclickRandom="this.$store.dispatch('FETCH_RANDOM_ANIME')"
		/>
		<VideoInfo id="Videoinfo"/>
	</div>
</template>

<script>
import VideoBox from './VideoBox.vue'
import VideoControls from './VideoControls.vue'
import VideoInfo from './VideoInfo.vue'

export default {
	name: 'Video',
	components: {
		VideoBox,
		VideoControls,
		VideoInfo
	},
	mounted() {
		this.$store.dispatch('FETCH_RANDOM_ANIME')
	},
	methods: {
		playPauseVid() {
			let video = document.getElementById("videoBox")
			if (video.paused) {
				video.play()
			} else {
				video.pause()
			}
		},
	}
}
</script>
<style>
#videowrapper {
  text-align: center;
  height: 600px;
}
</style>