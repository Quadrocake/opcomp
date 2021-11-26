<template>
  <!-- <div class="topbar">
    <Search class="search"/>
    <SearchYT class="searchYt"/>
  </div> -->
  <div class="wrapper">
    <!-- <List/> -->
    <LeftMenu class="leftmenu"/>
    <!-- <CompList /> -->
    <ActiveList />
    <Video class="video"/>
    
  </div>
</template>

<script>
// import store from './store'
import Video from './components/video/Video.vue'
// import Search from './components/search/Search.vue'
// import List from './components/list/List.vue'
// import SearchYT from './components/search/SearchYT.vue'
import ActiveList from './components/list/ActiveList.vue'
// import CompList from './components/list/CompList.vue'

import LeftMenu from './components/menu/LeftMenu.vue'

export default {
  name: 'App',
  // store: store,
  components: {
    Video,
    // Search,
    // List,
    // SearchYT,
    LeftMenu,
    ActiveList,
    // CompList
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
body {
  background-color: #2a2a2b;
  font-size: calc(0.6rem + 1vmin);
}
.topbar {
  background-color: #202020;
  height: 3rem;
}
.wrapper {
  display: grid;
  /* grid-template-columns: 350px 1fr 350px; */
  grid-template-columns: 20% 1fr 20%;
  grid-template-rows: 90vh 1fr;
  
  font-family: 'Roboto', sans-serif;
  color: Silver;
}
button {
  border: none;
  background: #353839;
  cursor: pointer;
  font-family: 'Urbanist', sans-serif;
  color: Gray;
  font-size: calc(0.30rem + 1vmin);
  height: 1.5rem;
}
input {
  border: none;
  background: #353839;
  color: Gray;
  font-size: calc(0.30em + 1vmin);
  height: 1.5rem;
  padding: 0;
  padding-left: 0.10rem;
}
.video {
  grid-row: 1;
  grid-column: 2;
  /* margin: 10px; */
}
.leftmenu {
  display: contents;
  grid-column: 1;
}
.search {
  grid-row: 2;
}
.searchYt {
  grid-row: 2;
  grid-column: 3;
}
</style>
