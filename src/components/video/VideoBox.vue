<template>
    <div>
        <video id="videoBox" :src="this.$store.state.videoUrl" controls autoplay="autoplay"></video>
    </div>
</template>

<script>
export default {
  name: "Player",
  data() {
        return {
            paused: true
        }
    }
}
</script>

<style>
  #videoBox {
    height: 500px !important;
  }
</style>