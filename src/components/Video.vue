<template>
  <div>
    <VideoBox v-bind:videoLink="videoLink"/>
  </div>
  <div>
    <VideoControls 
        v-on:onclickPause="playPauseVid"
        v-on:onclickRandom="randomOp"
    />
  </div>
</template>

<script>
import VideoBox from './VideoBox.vue'
import VideoControls from './VideoControls.vue'

const RANDOM_OP_REQUEST = 'https://staging.animethemes.moe/api/animetheme?sort=random&include=anime,animethemeentries.videos&filter[has]=animethemeentries&page[size]=1'

export default {
  name: 'Video',
  components: {
    VideoBox,
    VideoControls
  },
  data() {
    return {
      videoLink: "",
    }
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
        fetch(RANDOM_OP_REQUEST)
        .then(response => response.json())
        .then(json => {
            const link = json["animethemes"][0]["animethemeentries"][0]["videos"][0]["link"].replace('staging.', '')
            this.updVideoSrc(link)
        })
    },
    updVideoSrc(link){
        this.videoLink = link;
        document.getElementById("videoBox").load();
    }
  }
}
</script>
