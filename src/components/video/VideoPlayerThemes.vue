<template>
  <div id="themes-player">
    <video id="videoBox" :src="sourse" controls autoplay="autoplay"
    @ended="$emit('onendedNext')"
    ></video>
  </div>
</template>

<script>
export default {
  name: "VideoPlayerThemes",
  props: {
    sourse: String
  }
}
</script>

<style>

</style>