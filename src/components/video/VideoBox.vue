<template>
    <div>
        <video id="videoBox" :src="videoLink" controls autoplay="autoplay"></video>
    </div>
</template>

<script>
export default {
  name: "Player",
  props: ['videoLink'],
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