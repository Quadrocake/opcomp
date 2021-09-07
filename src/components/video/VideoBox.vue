<template>
  <!-- <div>
    <div>
      <YoutubeVue3
      v-if="this.$store.state.ytPlaying && this.$store.state.ytId"
      @ended="playNext()"
      ref="youtube" :videoid="this.$store.state.ytId" width="750" height="500"/>
    </div>
    <div>
      <ThemesPlayer 
        v-if='(!this.$store.state.ytPlaying) && (this.$store.state.videoUrl !== "")'
        :sourse="this.$store.state.videoUrl"
        @onendedNext="playNext()"
      />
    </div>
  </div> -->
  <div>
    <video id="videoBox" :src="this.$store.state.videoUrl" controls autoplay="autoplay"
    @ended="playNext()"
    ></video>
    <YoutubeVue3
    ref="youtube" :videoid="this.$store.state.ytId" :width="750" :height="500"
    @ended="playNext()"
    />
  </div>
</template>

<script>
import YoutubeVue3 from "./VideoPlayerYT.vue"
// import { defineAsyncComponent } from 'vue'

export default {
  name: "Player",
  components: {
    // YoutubeVue3: defineAsyncComponent({loader: () => import('./VideoPlayerYT.vue')}),
    // ThemesPlayer: defineAsyncComponent({loader: () => import('./VideoPlayerThemes.vue')})
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