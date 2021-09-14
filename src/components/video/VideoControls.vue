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
    },
    hotkeys(e) {
    if (e.code == 'KeyR') {
        this.$emit('onclickRandom')
    }
    else if (e.code == 'KeyK') {
        this.$emit('onclickPause')
    }
  }
  },
  mounted() {
    document.addEventListener('keyup', this.hotkeys, false);
  }
}
</script>