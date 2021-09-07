<template>
    <div>
        <video id="videoBox" :src="updateLink()" controls autoplay="autoplay"
        @ended="playNext()"
        v-if="!this.$store.state.ytPlaying"
        ></video>
        <YoutubeVue3
        v-if="this.$store.state.ytPlaying"
        @ended="playNext()"
        ref="youtube" :videoid="updateYtId()" :width="750" :height="500"/>
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
      console.log("play next")
      if (this.$store.state.currentlyPlaying != null) {
        this.$store.commit('playNext')
        }
    },
    updateYtId() {
      return this.$store.state.ytId
    },
    updateLink() {
      return this.$store.state.videoUrl
    }
    },
    mounted() {
      this.updateYtId()
      this.updateLink()
    },
    updated() {
      this.updateYtId()
      this.updateLink()
  }
}
</script>

<style>
  #videoBox {
    height: 500px !important;
  }
</style>