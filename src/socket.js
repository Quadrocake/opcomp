import { io } from "socket.io-client"

// const socket = io("ws://127.0.0.1:5000", {
//     reconnectionDelayMax: 10000,
//   })

const socket = io(`wss://op.727.pp.ua`, {
	reconnectionDelayMax: 10000,
})

export default socket