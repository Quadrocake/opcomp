<template>
  <div class="wrapper">
    <List/>
    <Video class="video"/>
    <Search class="search"/>
    <SearchYT class="search"/>
  </div>
</template>

<script>
import store from './store'
import Video from './components/video/Video.vue'
import Search from './components/search/Search.vue'
import List from './components/list/List.vue'
import SearchYT from './components/search/SearchYT.vue'

export default {
  name: 'App',
  store: store,
  components: {
    Video,
    Search,
    List,
    SearchYT
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Urbanist&display=swap');
body {
  background-color: #353839;
}
.wrapper {
  display: grid;
  position: absolute;
  grid-template-columns: 1fr 2fr 2fr;
  grid-template-rows: 650px 1fr;

  font-family: 'Urbanist', sans-serif;
  color: gray;
}
button {
  border: none;
  background: #353839;
  cursor: pointer;
  font-family: 'Urbanist', sans-serif;
  color: Gray;
}
.video {
  grid-row: 1;
  grid-column: 2;
  margin: 10px;
}
.search {
  grid-row: 2;
}
</style>
