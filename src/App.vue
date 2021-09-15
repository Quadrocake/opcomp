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
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
body {
  background-color: #2a2a2b;
  font-size: calc(0.75em + 1vmin);
}
.wrapper {
  display: grid;
  /* grid-template-columns: 350px 1fr 350px; */
  grid-template-columns: 20% 1fr 20%;
  grid-template-rows: 90vh 1fr;

  font-family: 'Roboto', sans-serif;
  color: gray;
}
button {
  border: none;
  background: #353839;
  cursor: pointer;
  font-family: 'Urbanist', sans-serif;
  color: Gray;
  font-size: calc(0.30em + 1vmin);
  height: 1.7em;
}
input {
  border: none;
  background: #353839;
  color: Gray;
  font-size: calc(0.30em + 1vmin);
}
.video {
  grid-row: 1;
  grid-column: 2;
  /* margin: 10px; */
}
.search {
  grid-row: 2;
}
</style>
