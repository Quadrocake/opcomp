<template>
  <div class="videocontainer">
    <div>
      <YoutubeVue3
      v-if="this.$store.state.ThemesApi.ytubePlaying && this.$store.state.ThemesApi.video.ytubeId"
      @ended="playNext()"
      ref="youtube" :videoid="this.$store.state.ThemesApi.video.ytubeId" :width="900" :height="600"/>
    </div>
    <div>
      <video id="videoBox" controls autoplay="autoplay"
        v-if='(!this.$store.state.ThemesApi.ytubePlaying) && (this.$store.state.ThemesApi.video.themeUrl !== "")'
        :src="this.$store.state.ThemesApi.video.themeUrl"
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
      if (this.$store.state.ThemesApi.opIndex !== "") {
        console.log("play next")
        this.$store.commit('playNext')
      }
      else {
        this.$store.dispatch('FETCH_RANDOM_ANIME')
      }
    },
    playPrev () {
      if (this.$store.state.ThemesApi.opIndex !== "") {
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