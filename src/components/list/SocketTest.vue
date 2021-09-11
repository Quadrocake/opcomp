<template>
  <p v-if="this.isConnected">Socket connected</p>
  <p>Message from server: "{{message}}"</p>
  <button @click="pingServer()">Ping Server</button>
</template>

<script>
import socket from '../../socket.js'

export default {
  data() {
    return {
      isConnected: false,
      message: '',
      socket: null
    }
  },
  methods: {
    pingServer() {
      this.socket.emit("hello server")
    }
  },
  created(){
    this.socket = socket
    socket.on("connect", () => {
    this.isConnected = true
  })
    socket.on("disconnect", () => {
    this.isConnected = false
  })
    socket.on("hello client", (arg) => {
    this.message = arg
  })

  }
}
</script>

<style>

</style>