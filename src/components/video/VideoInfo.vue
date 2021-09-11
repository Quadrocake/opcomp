<template>
  <div v-if="$parent.jsonLoaded">
    <p class="videoInfoLine">{{ $parent.videoJson["animethemes"][0]["anime"]["name"]}}</p> &nbsp;
    <p class="videoInfoLine">{{ $parent.videoJson["animethemes"][0]["type"]}}</p>
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