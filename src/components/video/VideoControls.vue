<template>
  <div>
    <button @click="$emit('onclickPause')" id="playPause">Pause</button>
    <button @click="$emit('onclickRandom')">Random</button>
    <button @click="reloadPlayer()">Reload</button>
    <button @click="this.$store.commit('addListEntry', this.$store.state.currentJson)">Add to list</button>
    <button @click="playPrev">Prev</button>
    <button @click="playNext">Next</button>
    <button @click="DT" :class="{toggled: isDt}">DT</button>
    <button @click="NC" :class="{toggled: isBass}">NC</button>
    <input id="yearStartInput" class="yearInput" type="number" v-model="this.$store.state.animeStartYear">
    <button @click="resetStartYear">X</button>
    <span> - </span>
    <input id="yearEndInput" class="yearInput" type="number" v-model="this.$store.state.animeEndYear">
    <button @click="resetEndYear">X</button>
    <select>
      <option disabled value="Type"></option>
      <option @click="changeTypeFilter(0)">All</option>
      <option @click="changeTypeFilter(1)">OP</option>
      <option @click="changeTypeFilter(2)">ED</option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDt: false,
      isBass: false
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
  },
  NC () {
    this.isBass = !this.isBass
     if (this.isBass) {
      document.querySelector('video').mozPreservesPitch = false
      document.querySelector('video').preservesPitch = false
      
    }
    else {
      document.querySelector('video').mozPreservesPitch = true
      document.querySelector('video').preservesPitch = true
      
    }

    // var context = new AudioContext(),
    //   audioSource = context.createMediaElementSource(document.getElementById("videoBox")),
    //   filter = context.createBiquadFilter();
    // audioSource.connect(filter);
    // filter.connect(context.destination);

    // filter.type = "lowshelf";
    // filter.frequency.value = 1000;
    // filter.gain.value = 25;

  },
  resetStartYear () {
    document.getElementById('yearStartInput').value = ''
    this.$store.commit('resetStartYear')
  },
  resetEndYear () {
    document.getElementById('yearEndInput').value = ''
    this.$store.commit('resetEndYear')
  },
  changeTypeFilter (type) {
    this.$store.state.filterOpType = type
  },
  mounted() {
    document.addEventListener('keyup', this.hotkeys, false);
  }
  }
}
</script>
<style>
.toggled{
  background: gainsboro;
}
.yearInput{
  width: 4rem;
}
</style>