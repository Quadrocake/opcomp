<template>
<div>
  <span class="searchBox">
    <input type="text" v-model="searchyt" placeholder="youtube...">
  </span>
  <span class="searchButton">
      <button @click="onclickSearchYT">Search</button>
  </span>
  <div class="searchContainer" v-for="entry in this.ytObjectList" :key="entry.opUrl">
      <img class="searchRes" :src="entry.thumbnail" alt="no img">
      <p @click="this.$store.dispatch('UPDATE_CURRENTLY_PLAYING', {theme: entry})">{{ entry.title }}</p> 
      <button @click="this.$store.commit('addListEntry', entry)">Add to list</button>
  </div>
</div>
</template>

<script>
export default {
  name: "SearchYT",
  data() {
    return {
      searchyt: "",
      BASE_SEARCH_URL: "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&key=AIzaSyDxgb25TunfttfRHSG1zhOGxTjNh-vvFEA&",
      response: {},
      ytObjectList: []
    }
  },
  methods: {
    onclickSearchYT () {
      this.ytObjectList = []
      const query = `${this.BASE_SEARCH_URL}q=${this.searchyt}`
      fetch(query)
      .then(response => response.json())
      .then(json => {
      this.response = json

      for (const item in json['items']) {
        const animeObj = {}
        animeObj['sourse'] = "yt"
        animeObj['opUrl'] = json['items'][item]['id']['videoId']
        animeObj['title'] = json['items'][item]['snippet']['title']
        animeObj['thumbnail'] = json['items'][item]['snippet']['thumbnails']['default']['url']

        this.ytObjectList.push(animeObj)
      }
      })
    }
  }
}
</script>

<style>
.searchRes {
  float: left;
}
.searchContainer {
  overflow: auto
}
</style>