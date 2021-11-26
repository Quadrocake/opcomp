<template>
  <!-- <div class="wrapper">
    <LeftMenu class="leftmenu"/>
    <ActiveList />
    <Video class="video"/>
  </div> -->
  <div class="wrapper">
    <div class="column col1">
      <LeftMenu class="leftmenu"/>
    </div>
    <div class="column col2">
      <Video class="video"/>
    </div>
    <div class="column col3">
      <ActiveList />
    </div>
  </div>
</template>

<script>
import LeftMenu from './components/menu/LeftMenu.vue'
import Video from './components/video/Video.vue'
import ActiveList from './components/list/ActiveList.vue'

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
  color: Silver;
  font-size: calc(0.6rem + 1vmin);
  font-family: 'Roboto', sans-serif;
  margin: 0;
}
.wrapper {
  display: flex;
  height: 100vh;
}
.column {
  max-height: 100%;
}
.col1 {
  /* height: 100vh; */
  width: 20%;
}
.col2 {
  width: 60%;
}
.col3 {
  width: 20%;
}
/* .wrapper {
  display: grid;

  grid-template-columns: 20% 1fr 20%;
  grid-template-rows: 90vh 1fr; 
} */
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
/* .video {
  grid-row: 1;
  grid-column: 2;
  margin: 10px;
} */
/* .leftmenu {
  grid-column: 1;
}
.search {
  grid-row: 2;
}
.searchYt {
  grid-row: 2;
  grid-column: 3;
} */
</style>
