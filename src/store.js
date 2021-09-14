import { createStore } from 'vuex'

const store = createStore({
  state: {
    videoUrl: "",
    ytId: "",
    ytPlaying: false,
    playerType: "themes",
    userList: [],
    currentlyPlaying: 0,
    appUrl: "op.bots.confa.pp.ua"
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
      if(payload.index !== undefined) {
        state.currentlyPlaying = payload.index
      }
    },
    playNext (state) {
      state.currentlyPlaying = ++state.currentlyPlaying % state.userList.length
      console.log(state.currentlyPlaying)
      if (state.userList[state.currentlyPlaying].sourse == "themes") {
        this.commit("updateUrl", {newUrl: state.userList[state.currentlyPlaying].opUrl, sourse: state.userList[state.currentlyPlaying].sourse})
        // state.videoUrl = state.userList[state.currentlyPlaying].opUrl.replace('staging.', '')
        console.log(state.userList[state.currentlyPlaying])
      }
      else if (state.userList[state.currentlyPlaying].sourse == "yt") {
        this.commit("updateUrl", {newUrl: state.userList[state.currentlyPlaying].opUrl, sourse: state.userList[state.currentlyPlaying].sourse})
        console.log(state.userList[state.currentlyPlaying].opUrl)
      }
    },
    updateList (state, list) {
      state.userList = list
    },
    addListEntry (state, entry) {
      state.userList.push(entry)
      console.log(JSON.stringify(state.userList))
    },
    removeListEntry (state, index) {
      state.userList.splice(index, 1)
    },
    resetCurrentlyPlaying (state) {
      state.currentlyPlaying = ""
    },
    clearUserList (state) {
      state.userList = []
    }
    }
  })

export default store;