<template>
  <div>
    <VideoBox id="VideoBox"/>
    <VideoControls id="VideoControls"
        @onclickPause="playPauseVid"
        @onclickRandom="randomOp"
    />
    <VideoInfo id="Videoinfo" v-if="!jsonLoading"/>
    <SocketTest />
  </div>
</template>

<script>
import VideoBox from './VideoBox.vue'
import VideoControls from './VideoControls.vue'
import VideoInfo from './VideoInfo.vue'
// TEST
import SocketTest from '../list/SocketTest.vue'

const RANDOM_OP_REQUEST = 'https://staging.animethemes.moe/api/animetheme?sort=random&include=anime,animethemeentries.videos&filter[has]=animethemeentries&page[size]=1'

export default {
  name: 'Video',
  components: {
    VideoBox,
    VideoControls,
    VideoInfo,
    SocketTest
  },
  data() {
    return {
      videoJson: {},
      jsonLoaded: false,
      jsonLoading: false,
    }
  },
  mounted() {
    this.randomOp()
  },
methods: {
    playPauseVid() {
        let video = document.getElementById("videoBox")
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
    },
    randomOp() {
        this.jsonLoading = true
        fetch(RANDOM_OP_REQUEST)
        .then(response => response.json())
        .then(json => {
            this.videoJson = json
            this.jsonLoaded = true
            this.jsonLoading = false
            const url = json["animethemes"][0]["animethemeentries"][0]["videos"][0]["link"]
            this.$store.commit('resetCurrentlyPlaying')
            this.updVideoSrc(url)
        })
    },
    updVideoSrc(url){
        this.$store.commit('updateUrl', {newUrl: url, sourse: "themes"});
        // document.getElementById("videoBox").load();
    }
  }
}
</script>