<template>
  <div>
    <button @click="$emit('onclickPause')" id="playPause">Pause</button>
    <button @click="$emit('onclickRandom')">Random</button>
    <button @click="reloadPlayer()">Reload</button>
  </div>
</template>

<script>
export default {
  methods:{
    reloadPlayer() {
      document.getElementById("videoBox").load();
    }
  }

}
</script>