<template>
  <div>
  <div>
    <button @click="showHistory = !showHistory">History</button>
    <button @click="showAllOps = !showAllOps">All OPs</button>
  </div>
  <div v-if="this.$store.state.ThemesApi.video.themeObject">
    <p class="videoInfoLine">{{ this.$store.state.ThemesApi.video.themeObject['anime'] }}</p> &nbsp;
    <p class="videoInfoLine" v-if="this.$store.state.ThemesApi.video.themeObject['type']">{{ this.$store.state.ThemesApi.video.themeObject['type'] }}</p> &nbsp;
    <p class="videoInfoLine">{{ this.$store.state.ThemesApi.video.themeObject['title'] }}</p> 
  </div>
  <div>
    <ul v-if="showHistory" id="historylist">
      <li v-for="entry in this.$store.state.ThemesApi.playHistory" :key="entry.opId">
        <span @click="this.$store.dispatch('UPDATE_CURRENTLY_PLAYING', {theme: entry})">
          <div class="historyspan">{{ entry.anime }}</div> &nbsp;
          <div class="historyspan">{{ entry.type }}</div> &nbsp;
          <div class="historyspan">{{ entry.title }}</div>
        </span>
      </li>
    </ul>
  </div>
  <div>
    <ul v-if="showAllOps" id="historylist">
      <li v-for="entry in this.$store.state.ThemesApi.animeThemesList" :key="entry.opId">
        <span @click="this.$store.dispatch('UPDATE_CURRENTLY_PLAYING', {theme: entry})">
          <div class="historyspan">{{ entry.anime }}</div> &nbsp;
          <div class="historyspan">{{ entry.type }}</div> &nbsp;
          <div class="historyspan">{{ entry.title }}</div>
        </span>
      </li>
    </ul>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showHistory: false,
      showAllOps: false
    }
  }
}
</script>

<style>
  .videoInfoLine, .historyspan {
    display: inline;
  }
  #historylist {
    list-style-type: none;
  }
</style>