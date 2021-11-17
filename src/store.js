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
    animeStartYear: '',
    animeEndYear: '',
    randomHistory: [],
    filterOpType: 0,
    allAnimeOps: []
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
    resetStartYear (state) {
      state.animeStartYear = ''
    },
    resetEndYear (state) {
      state.animeEndYear = ''
    },
    randomOp (state) {
      // const NEW_OP_REQUEST = 'https://staging.animethemes.moe/api/anime?sort=random&fields[anime]=name,year&fields[video]=id,link&fields[animetheme]=type,slug&fields[song]=title&fields[animethemeentry]=spoiler&include=animethemes.animethemeentries.videos,animethemes.song&page[size]=1&filter[has]=animethemeentries'
      let filter = ''
      if (state.animeStartYear) {
        filter = filter + '&filter[year][gte]=' + state.animeStartYear
      }
      if (state.animeEndYear) {
        filter = filter + '&filter[year][lte]=' + state.animeEndYear
      }
      if (state.filterOpType == 1) {
        filter = filter + '&filter[year][lte]='
      }
      const RANDOM_OP_REQUEST = 'https://staging.animethemes.moe/api/anime?sort=random&fields[anime]=id,name,year&fields[video]=id,link&fields[animetheme]=type,slug&fields[song]=title&fields[animethemeentry]=spoiler&include=animethemes.animethemeentries.videos,animethemes.song&page[size]=1&filter[has]=animethemeentries' + filter
      fetch(RANDOM_OP_REQUEST)
      .then(response => response.json())
      .then(json => {
        const filteredOpList = []
        this.commit('parseRandomJson', {json: json})
        const randomOps = state.allAnimeOps
        console.log(randomOps)
        for (let counter = 0; counter < randomOps.length; counter++) {
          console.log(counter)
          if (state.filterOpType == 0) {
            filteredOpList.push(counter)
          }
          else if (state.filterOpType == 1) {
            if (randomOps[counter]['type'] == "OP") {
              filteredOpList.push(counter)
            }
          }
          else if (state.filterOpType == 2) {
            if (randomOps[counter]['type'] == "ED") {
              filteredOpList.push(counter)
            }
          }
        }
        if (filteredOpList.length) {
          const randomOp = filteredOpList[Math.floor(Math.random() * filteredOpList.length)]
          store.commit('resetCurrentlyPlaying')
          store.commit('updateUrl', {newUrl: randomOps[randomOp]['opUrl'], sourse: "themes", opJson: randomOps[randomOp]})
          state.randomHistory.unshift(randomOps[randomOp])
          if (state.randomHistory.length > 10) {
            state.randomHistory.pop()
          }
        }
        else {
          setTimeout(() => { console.log("Wait after repeated request"); }, 2000)
          this.commit('randomOp', state)
        }
      })
    },
    parseRandomJson (state, payload) {
      const json = payload.json
      const randomOps = []

      for (let counter = 0; counter < json['anime'][0]['animethemes'].length; counter++) {
        const opJson = {}

        opJson['sourse'] = "themes"
        opJson['type'] = json['anime'][0]['animethemes'][counter]['type']
        opJson['year'] = json['anime'][0]['year']
        opJson['title'] = json['anime'][0]['animethemes'][counter]['song']['title']
        opJson['anime'] = json['anime'][0]['name']
        opJson['animeId'] = json['anime'][0]['id']
        opJson['opUrl'] = json['anime'][0]['animethemes'][counter]['animethemeentries'][0]['videos'][0]['link']
        opJson['opId'] = json['anime'][0]['animethemes'][counter]['animethemeentries'][0]['videos'][0]['id']
        
        randomOps.push(opJson)
      }
      state.allAnimeOps = randomOps
    }
    }
  })

export default store;