import { io } from "socket.io-client"


const socket = io(`ws://op.bots.confa.pp.ua`, {
    reconnectionDelayMax: 10000,
  })

export default socket