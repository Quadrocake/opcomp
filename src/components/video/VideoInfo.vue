<template>
  <div v-if="this.$store.state.currentJson">
    <p class="videoInfoLine">{{ this.$store.state.currentJson['anime'] }}</p> &nbsp;
    <p class="videoInfoLine" v-if="this.$store.state.currentJson['type']">{{ this.$store.state.currentJson['type'] }}</p> &nbsp;
    <p class="videoInfoLine">{{ this.$store.state.currentJson['title'] }}</p> 
  </div>
</template>

<style>
  .videoInfoLine {
    display: inline;
  }
  #synopsis {
    width: 900px;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }
</style>