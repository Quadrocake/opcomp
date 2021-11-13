import { createStore } from 'vuex'

const store = createStore({
  state: {
    videoUrl: "",
    ytId: "",
    ytPlaying: false,
    playerType: "themes",
    userList: [],
    currentlyPlaying: 0,
    currentJson: {},
    appUrl: "https://op.bots.confa.pp.ua",
    // appUrl: "127.0.0.1:5000",
  },
  mutations: {
    updateUrl (state, payload) {
      state.playerType = payload.sourse
      console.log(JSON.stringify(payload.opJson))
      state.currentJson = payload.opJson
      if (payload.sourse == "themes") {
        state.ytPlaying = false
        state.videoUrl = payload.newUrl.replace('staging.', '')
      }
      else if (payload.sourse == "yt") {
        state.ytPlaying = true
        state.ytId = payload.newUrl
      }
      if(payload.index !== undefined) {
        state.currentlyPlaying = payload.index
      }
    },
    playNext (state) {
      state.currentlyPlaying = ++state.currentlyPlaying % state.userList.length
      this.commit('newVideo')
    },
    playPrev (state) {
      if (state.currentlyPlaying == 0) {
        state.currentlyPlaying = state.userList.length - 1
      }
      else {
        state.currentlyPlaying = --state.currentlyPlaying
      }
      this.commit('newVideo')
    },
    newVideo(state) {
      if (state.userList[state.currentlyPlaying].sourse == "themes") {
        this.commit("updateUrl", {newUrl: state.userList[state.currentlyPlaying].opUrl, sourse: state.userList[state.currentlyPlaying].sourse, opJson: state.userList[state.currentlyPlaying]})
      }
      else if (state.userList[state.currentlyPlaying].sourse == "yt") {
        this.commit("updateUrl", {newUrl: state.userList[state.currentlyPlaying].opUrl, sourse: state.userList[state.currentlyPlaying].sourse, opJson: state.userList[state.currentlyPlaying]})
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
    },
    shuffleList (state) {
      let currentIndex = state.userList.length, randomIndex
      while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--

        [state.userList[currentIndex], state.userList[randomIndex]] = [state.userList[randomIndex], state.userList[currentIndex]]
      }
    },
    randomOp () {
      const RANDOM_OP_REQUEST = 'https://staging.animethemes.moe/api/animetheme?sort=random&include=anime,song,animethemeentries.videos&filter[has]=animethemeentries&page[size]=1'
      fetch(RANDOM_OP_REQUEST)
      .then(response => response.json())
      .then(json => {
        const opJson = {}
        opJson['sourse'] = "themes"
        opJson['type'] = json['animethemes'][0]['type']
        opJson['title'] = json['animethemes'][0]['song']['title']
        opJson['anime'] = json['animethemes'][0]['anime']['name']
        opJson['opUrl'] = json["animethemes"][0]["animethemeentries"][0]["videos"][0]["link"]

      store.commit('resetCurrentlyPlaying')
      store.commit('updateUrl', {newUrl: opJson['opUrl'], sourse: "themes", opJson: opJson})
      })
    }
    }
  })

export default store;