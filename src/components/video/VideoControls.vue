<template>
  <div>
    <button @click="$emit('onclickPause')" id="playPause">Pause</button>
    <button @click="$emit('onclickRandom')">Random</button>
  </div>
</template>
