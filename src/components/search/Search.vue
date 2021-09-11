<template>
<div>
  <span class="searchBox">
    <input type="text" v-model="search" placeholder="search...">
  </span>
  <span class="searchButton">
    <button @click="onclickSearch">Search</button>
  </span>
  <div v-for="anime in this.animeObjectList" :key="anime.id">
    {{ anime.name }}
    <div v-for="op in anime.opList" :key="op.id">
      <span @click="this.$store.commit('updateUrl', {newUrl: op.opUrl, sourse: op.sourse})">{{ op.type }} {{ op.title }} {{ op.opUrl }}</span> 
      <span @click="this.$store.commit('addListEntry', op)">Add to list</span>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "Search",
  data() {
      return {
          search: "",
          BASE_SEARCH_URL: "https://staging.animethemes.moe/api/search?&fields[search]=anime&include[anime]=animethemes.animethemeentries.videos,animethemes.song&fields[anime]=name&fields[animetheme]=type&fields[animethemeentry]=id&fields[song]=title&fields[video]=link&page[limit]=5&",
          response: {},
          animeObjectList: []
      }
  },
  methods: {
    onclickSearch() {
      this.animeObjectList = []
      const query = `${this.BASE_SEARCH_URL}q=${this.search}`
      fetch(query)
      .then(response => response.json())
      .then(json => {
      this.response = json
    
      for (const item in json['search']['anime']) {
      const animeObj = {}
      const opList = []
      animeObj['name'] = json['search']['anime'][item]['name']
        for (const item2 in json['search']['anime'][item]['animethemes']) {
          const opEntry = {}
          animeObj['opList'] = opList
          opEntry['sourse'] = "themes"
          opEntry['type'] = json['search']['anime'][item]['animethemes'][item2]['type']
          opEntry['title'] = json['search']['anime'][item]['animethemes'][item2]['song']['title']
          opEntry['opUrl'] = json['search']['anime'][item]['animethemes'][item2]['animethemeentries'][0]['videos'][0]['link']
          opList.push(opEntry)
        }
      this.animeObjectList.push(animeObj)
      }    
      })
    }
  }
}
</script>

<style>

</style>