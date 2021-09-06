import { createStore } from 'vuex'

const store = createStore({
  state: {
    videoUrl: "",
    ytId: "",
    ytPlaying: false,
    playerType: "themes",
    userList: [],
    currentlyPlaying: ""
  },
  mutations: {
    updateUrl (state, payload) {
      state.playerType = payload.sourse
      console.log(payload.sourse)
      if (payload.sourse == "themes") {
        console.log(payload.newUrl)
        state.ytPlaying = false
        state.videoUrl = payload.newUrl.replace('staging.', '')
        // document.getElementById("videoBox").load();
      }
      else if (payload.sourse == "yt") {
        state.ytPlaying = true
        state.ytId = payload.newUrl
        console.log(state.ytId)
        console.log(payload.newUrl)
        // document.getElementById("ytBox").load();
      }
      state.currentlyPlaying = payload.index
    },
    playNext (state) {
      state.currentlyPlaying = ++state.currentlyPlaying % state.userList.length
      state.videoUrl = state.userList[state.currentlyPlaying].opUrl.replace('staging.', '')
    },
    addListEntry (state, entry) {
      state.userList.push(entry)
    },
    removeListEntry (state, index) {
      state.userList.splice(index, 1)
    },
    setCurrentlyPlaying (state, index) {
      state.currentlyPlaying = index
    }
    }
  })

export default store;