<template>
  <div>
  <div>
    <button @click="showHistory = !showHistory">History</button>
    <button @click="showAllOps = !showAllOps">All OPs</button>
  </div>
  <div v-if="this.$store.state.currentJson">
    <p class="videoInfoLine">{{ this.$store.state.currentJson['anime'] }}</p> &nbsp;
    <p class="videoInfoLine" v-if="this.$store.state.currentJson['type']">{{ this.$store.state.currentJson['type'] }}</p> &nbsp;
    <p class="videoInfoLine">{{ this.$store.state.currentJson['title'] }}</p> 
  </div>
  <div>
    <ul v-if="showHistory" id="historylist">
      <li v-for="entry in this.$store.state.randomHistory" :key="entry.opId">
        <span @click="this.$store.commit('updateUrl', {newUrl: entry.opUrl, index: index, sourse: entry.sourse, opJson: entry})">
          <div class="historyspan">{{ entry.anime }}</div> &nbsp;
          <div class="historyspan">{{ entry.type }}</div> &nbsp;
          <div class="historyspan">{{ entry.title }}</div>
        </span>
      </li>
    </ul>
  </div>
  <div>
    <ul v-if="showAllOps" id="historylist">
      <li v-for="entry in this.$store.state.allAnimeOps" :key="entry.opId">
        <span @click="this.$store.commit('updateUrl', {newUrl: entry.opUrl, index: index, sourse: entry.sourse, opJson: entry})">
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