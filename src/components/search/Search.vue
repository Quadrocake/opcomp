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
    <div v-for="op in anime.opList" :key="op.id">
      <span @click="this.$store.commit('updateUrl', {newUrl: op.opUrl, sourse: op.sourse, opJson: op})">{{ op.type }} {{ op.title }}</span> 
      <button @click="this.$store.commit('addListEntry', op)">+</button>
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
          // BASE_SEARCH_URL: "https://staging.animethemes.moe/api/search?&fields[search]=anime&include[anime]=animethemes.animethemeentries.videos,animethemes.song&fields[anime]=name&fields[animetheme]=type&fields[animethemeentry]=id&fields[song]=title&fields[video]=link&page[limit]=5&",
          BASE_SEARCH_URL:  'https://staging.animethemes.moe/api/search?fields[search]=anime&fields[anime]=id,name,year&fields[video]=id,link&fields[animetheme]=type,slug&fields[song]=title&fields[animethemeentry]=spoiler&include=animethemes.animethemeentries.videos,animethemes.song&filter[has]=animethemeentries&page[limit]=5&',
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
          // opEntry['sourse'] = "themes"
          // opEntry['type'] = json['search']['anime'][item]['animethemes'][item2]['type']
          // opEntry['anime'] = json['search']['anime'][item]['name']
          // opEntry['title'] = json['search']['anime'][item]['animethemes'][item2]['song']['title']
          // opEntry['opUrl'] = json['search']['anime'][item]['animethemes'][item2]['animethemeentries'][0]['videos'][0]['link']
          opEntry['sourse'] = "themes"
          opEntry['type'] = json['search']['anime'][item]['animethemes'][item2]['type']
          opEntry['year'] = json['search']['anime'][item]['year']
          opEntry['title'] = json['search']['anime'][item]['animethemes'][item2]['song']['title']
          opEntry['anime'] = json['search']['anime'][item]['name']
          opEntry['animeId'] = json['search']['anime'][item]['id']
          opEntry['opUrl'] = json['search']['anime'][item]['animethemes'][item2]['animethemeentries'][0]['videos'][0]['link']
          opEntry['opId'] = json['search']['anime'][item]['animethemes'][item2]['animethemeentries'][0]['videos'][0]['id']
          opList.push(opEntry)
          console.log(opList)
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