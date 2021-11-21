<template>
<div>
  <span class="searchBox">
    <input type="text" v-model="search" placeholder="search...">
  </span>
  <span class="searchButton">
    <button @click="onclickSearch">Search</button>
  </span>
  <div v-for="anime in this.animeObjectList" :key="anime.id">
    <h4>{{ anime.name }}</h4>
    <div v-for="entry in anime.opList" :key="entry.id">
      <span @click="this.$store.dispatch('UPDATE_CURRENTLY_PLAYING', {theme: entry})">{{ entry.type }} {{ entry.title }}</span> 
      <button @click="this.$store.commit('addListEntry', entry)">+</button>
    </div>
  </div>
</div>
</template>

<script>
import Config from "../../config.js"
import { parseAnimeJson } from "../../helpers"

export default {
  name: "Search",
  data() {
      return {
          search: "",
          animeObjectList: []
      }
  },
  methods: {
    onclickSearch() {
      const SEARCH_REQUEST = Config.BASE_SEARCH_URL + Config.ANIME_FIELDS + "&q=" + this.search
      this.animeObjectList = []

      fetch(SEARCH_REQUEST)
      .then(response => response.json())
      .then(json => {
        for (const index in json['search']['anime']) {
          const animeObj = {}
          animeObj['name'] = json['search']['anime'][index]['name']
          animeObj['opList'] = parseAnimeJson(json['search'], index)

          this.animeObjectList.push(animeObj)
        }    
      })
    }
  }
}
</script>

<style>

</style>