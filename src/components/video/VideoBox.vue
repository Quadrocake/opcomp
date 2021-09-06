<template>
    <div>
        <video id="videoBox" :src="this.$store.state.videoUrl" controls autoplay="autoplay"
        @ended="playNext()"
        v-if="!this.$store.state.ytPlaying"
        ></video>
        <YoutubeVue3
        v-if="this.$store.state.ytPlaying"
        ref="youtube" :videoid="this.$store.state.ytId" :width="750" :height="500"/>
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
      playNext() {
        if (this.$store.state.currentlyPlaying != null) {
          this.$store.commit('playNext')
          }
      }
    }
}
</script>

<style>
  #videoBox {
    height: 500px !important;
  }
</style>