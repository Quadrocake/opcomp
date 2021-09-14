<template>
  <div class="videocontainer">
    <div>
      <YoutubeVue3
      v-if="this.$store.state.ytPlaying && this.$store.state.ytId"
      @ended="playNext()"
      ref="youtube" :videoid="this.$store.state.ytId" :width="900" :height="600"/>
    </div>
    <div>
      <video id="videoBox" controls autoplay="autoplay"
        v-if='(!this.$store.state.ytPlaying) && (this.$store.state.videoUrl !== "")'
        :src="this.$store.state.videoUrl"
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
    playNext(next) {
      console.log(this.$store.state.currentlyPlaying)
      if (this.$store.state.currentlyPlaying !== "") {
        if (next) {
          console.log("play next")
          this.$store.commit('playNext')
        }
        else if (!next) {
          console.log("play prev")
          this.$store.commit('playPrev')
        }
      }
      else {
        this.$store.commit('randomOp')
      }
    },
    hotkeys(e) {
    if (e.code == 'ArrowRight') {
      this.playNext(true)
    } 
    else if (e.code == 'ArrowLeft') {
      this.playNext(false)
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
    max-width: 90%;
    max-height: 70vh;
    min-height: 60vh;
  }
</style>