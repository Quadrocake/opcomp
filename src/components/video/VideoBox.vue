<template>
  <div>
    <div>
      <YoutubeVue3
      v-if="this.$store.state.ytPlaying && this.$store.state.ytId"
      @ended="playNext()"
      ref="youtube" :videoid="this.$store.state.ytId" :width="750" :height="500"/>
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
    playNext() {
      console.log(this.$store.state.currentlyPlaying)
      if (this.$store.state.currentlyPlaying !== "") {
        console.log("play next")
        this.$store.commit('playNext')
      }
    },
  }
}
</script>

<style>
  #videoBox {
    height: 500px !important;
  }
</style>