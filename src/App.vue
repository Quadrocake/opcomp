<template>
  <Video />
  <Search />
</template>

<script>
import store from './store'
import Video from './components/video/Video.vue';
import Search from './components/search/Search.vue'

export default {
  name: 'App',
  store: store,
  components: {
    Video,
    Search
  }
}
</script>

<style>
#app {
  text-align: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
