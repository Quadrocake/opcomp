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
    <input id="yearStartInput" class="yearInput" type="number" v-model="animeStartYear">
    <button @click="resetStartYear">X</button>
    <span> - </span>
    <input id="yearEndInput" class="yearInput" type="number" v-model="animeEndYear">
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
  computed: {
    animeStartYear: {
      get () {
        return this.$store.state.ThemesApi.filters.animeStartYear
      },
      set (value) {
        this.$store.commit('updateAnimeStartYear', value)
      }
    },
    animeEndYear: {
      get () {
        return this.$store.state.ThemesApi.filters.animeEndYear
      },
      set (value) {
        this.$store.commit('updateAnimeEndYear', value)
      }
    },
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
          this.$store.dispatch('FETCH_RANDOM_ANIME')
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
      const videoSelector = document.querySelector('video')
      if (this.isDt) {
        videoSelector.defaultPlaybackRate = 1.5
        videoSelector.playbackRate = 1.5
      }
      else {
        videoSelector.defaultPlaybackRate = 1
        videoSelector.playbackRate = 1
      }
    },
    NC () {
      this.isBass = !this.isBass
      const videoSelector = document.querySelector('video')
      if (this.isBass) {
        videoSelector.mozPreservesPitch = false
        videoSelector.preservesPitch = false
      }
      else {
        videoSelector.mozPreservesPitch = true
        videoSelector.preservesPitch = true
      }
    },
    resetStartYear () {
      document.getElementById('yearStartInput').value = ''
      this.$store.commit('resetAnimeStartYear')
    },
    resetEndYear () {
      document.getElementById('yearEndInput').value = ''
      this.$store.commit('resetAnimeEndYear')
    },
    changeTypeFilter (type) {
      // this.$store.state.filterOpType = type
      this.$store.dispatch('CHANGE_TYPE_FILTER', {value: type})
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