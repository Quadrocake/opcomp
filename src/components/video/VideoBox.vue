<template>
  <div class="videocontainer">
    <div>
      <YoutubeVue3
      v-if="this.$store.state.ytPlaying && this.$store.state.ytId"
      @ended="playNext()"
      ref="youtube" :videoid="this.$store.state.ytId" :width="900" :height="600"/>
    </div>
    <div>
      <video crossorigin="anonymous" id="videoBox" controls autoplay="autoplay"
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
    playNext () {
      if (this.$store.state.currentlyPlaying !== "") {
        console.log("play next")
        this.$store.commit('playNext')
      }
      else {
        this.$store.commit('randomOp')
      }
    },
    playPrev () {
      if (this.$store.state.currentlyPlaying !== "") {
        console.log("play prev")
        this.$store.commit('playPrev')
      }
    },
    hotkeys(e) {
      if (e.target.nodeName !== 'INPUT') {
        if (e.code == 'ArrowRight') {
          this.playNext()
        } 
        else if (e.code == 'ArrowLeft') {
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