<template>
  <div>
    <button @click="$emit('onclickPause')" id="playPause">Pause</button>
    <button @click="$emit('onclickRandom')">Random</button>
    <button @click="reloadPlayer()">Reload</button>
    <button @click="this.$store.commit('addListEntry', this.$store.state.currentJson)">Add to list</button>
    <button @click="playPrev">Prev</button>
    <button @click="playNext">Next</button>
    <button @click="DT" :class="{toggled: isDt}">DT</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDt: false
    }
  },
  methods:{
    reloadPlayer() {
      document.getElementById("videoBox").load();
    },
    hotkeys(e) {
    if (e.target.nodeName !== 'INPUT') {
      if (e.code == 'KeyR') {
        this.$emit('onclickRandom')
      }
      else if (e.code == 'KeyK') {
        this.$emit('onclickPause')
      }
    }
  },
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
    DT () {
      this.isDt = !this.isDt
      if (this.isDt) {
        document.querySelector('video').defaultPlaybackRate = 1.5
        document.querySelector('video').playbackRate = 1.5
      }
      else {
        document.querySelector('video').defaultPlaybackRate = 1
        document.querySelector('video').playbackRate = 1
      }
      
    }
  },
  mounted() {
    document.addEventListener('keyup', this.hotkeys, false);
  }
}
</script>
<style>
.toggled{
  background: gainsboro;
}
</style>