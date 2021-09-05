<template>
  <span class="searchBox">
      <input type="text" v-model="search" placeholder="search...">
  </span>
  <span class="searchButton">
      <button @click="onclickSearch">Search</button>
  </span>
  
  <!-- <div class="resultBoxes" v-for="anime in response['search']" :key="anime.value">{{ anime }}</div> -->
  <!-- <div class="resultNames" v-for="anime in this.animeObjectList" :key="anime.name">{{ anime.name }}</div> -->
  
  <div v-for="anime in this.animeObjectList" :key="anime.id">
      {{ anime.name }}
      <div v-for="op in anime.opList" :key="op.id" @click="this.$store.commit('updateUrl', op.opUrl)">
          {{ op.type }} {{ op.opUrl }}
      </div>
  </div>

  <div>
      <!-- <p>{{ response }}</p> -->
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
      return {
          search: "",
          BASE_SEARCH_URL: "https://staging.animethemes.moe/api/search?&fields[search]=anime&include[anime]=animethemes.animethemeentries.videos&fields[anime]=name&fields[animetheme]=type&fields[animethemeentry]=id&fields[video]=link&page[limit]=5&",
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
                opEntry['type'] = json['search']['anime'][item]['animethemes'][item2]['type']
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