<template>
	<div class="videocontainer">
		<div>
			<YoutubeVue3
			v-if="this.$store.state.Themes.ytubePlaying && this.$store.state.Themes.video.ytubeId"
			@ended="playNext()"
			ref="youtube" :videoid="this.$store.state.Themes.video.ytubeId" :width="900" :height="600"/>
		</div>
		<div>
			<video id="videoBox" controls autoplay="autoplay"
				v-if='(!this.$store.state.Themes.ytubePlaying) && (this.$store.state.Themes.video.themeUrl !== "")'
				:src="this.$store.state.Themes.video.themeUrl"
				@ended="playNext()"
			></video>
		</div>
	</div>
</template>

<script>
import YoutubeVue3 from "./VideoPlayerYT.vue"

export default {
	name: "Player",
	components: {
		YoutubeVue3
	},
	data() {
		return {
			paused: true
		}
	},
	methods: {
		playNext () {
			if (this.$store.state.Themes.opIndex !== "") {
				console.log("play next")
				this.$store.dispatch('PLAY_NEXT')
			}
			else {
				this.$store.dispatch('FETCH_RANDOM_ANIME')
			}
		},
		playPrev () {
			if (this.$store.state.Themes.opIndex !== "") {
				console.log("play prev")
				this.$store.dispatch('PLAY_PREV')
			}
		},
		hotkeys(e) {
			if (e.target.nodeName !== 'INPUT') {
				if (e.code == 'ArrowRight' || e.code == 'KeyL') {
					this.playNext()
				} 
				else if (e.code == 'ArrowLeft' || e.code == 'KeyJ') {
					this.playPrev()
				}
			}
		}
	},
	mounted() {
		document.addEventListener('keyup', this.hotkeys, false);
	}
}
</script>

<style>
  #videoBox {
    max-width: 95%;
    height: 70vh;
  }
</style>