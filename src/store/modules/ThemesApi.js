import Config from "../../config.js"
import { parseAnimeJson } from "../../helpers"
import { filterAnimeThemesByType } from "../../helpers"

const ThemesApi = {
    state: () => ({
        opIndex: "",
        ytubePlaying: false,
        animeThemesList: [],
        playHistory: [],
        video: {
            themeUrl: "",
            ytubeId: "",
            themeObject: {}
        },
        filters: {
            animeStartYear: '',
            animeEndYear: '',
            type: 0
        }
    }),
    getters: {
        GET_FILTER_FIELDS (state) {
            let filter = ''
            if (state.filters.animeStartYear) {
                filter = filter + '&filter[year][gte]=' + state.filters.animeStartYear
            }
            if (state.filters.animeEndYear) {
                filter = filter + '&filter[year][lte]=' + state.filters.animeEndYear
            }
            return filter
        }
    },
    actions: {
        FETCH_RANDOM_ANIME ({state, getters, commit, dispatch}) {
            const RANDOM_ANIME_REQUEST = Config.BASE_RANDOM_ANIME_REQUEST + Config.ANIME_FIELDS + getters.GET_FILTER_FIELDS
            
            fetch(RANDOM_ANIME_REQUEST)
            .then(response => response.json())
            .then(json => {
                // random always returns one anime, so index is 0
                const parsedAnimeThemes = parseAnimeJson(json, 0)

                console.log(RANDOM_ANIME_REQUEST)
                console.log(parsedAnimeThemes)

                const filteredThemes = filterAnimeThemesByType(parsedAnimeThemes, state.filters.type)

                if (filteredThemes.length) {
                    const randomizedTheme = filteredThemes[Math.floor(Math.random() * filteredThemes.length)]
                    dispatch('UPDATE_CURRENTLY_PLAYING', {theme: randomizedTheme})
                    commit('updatePlayHistory', randomizedTheme)
                    commit('updateAnimeThemesList', parsedAnimeThemes)
                }
                else {
                    setTimeout(() => { console.log("Wait before repeating request"); }, 2000)
                    dispatch('FETCH_RANDOM_ANIME')
                }
            })
            // console.log(getters.GET_FILTER_FIELDS)
        },
        UPDATE_CURRENTLY_PLAYING ({commit}, {theme, index}) {
            commit('resetOpIndex')
            commit('updateThemeObject', theme)
                if (theme.sourse == "themes") {
                    commit('updateCurrentPlayer', false)
                    commit('updateThemeUrl', theme.opUrl)
                }
                else if (theme.sourse == "yt") {
                    commit('updateCurrentPlayer', true)
                    commit('updateYtubeId', theme.opUrl)
                }
                if(index !== undefined) {
                    commit('updateOpIndex', index)
                    // state.currentlyPlaying = payload.index
                }
        },
        // updateUrl (state, payload) {
        //     if(payload.index !== undefined) {
        //       state.currentlyPlaying = payload.index
        //     }
        // },
        CHANGE_TYPE_FILTER ({ commit }, payload) {
            commit('updateTypeFilter', payload.value)
        }
    },
    mutations: {
        updateThemeObject (state, value) {
            state.video.themeObject = value
        },
        updateAnimeThemesList (state, value) {
            state.animeThemesList = value
        },
        updateCurrentPlayer (state, value) {
            state.ytubePlaying = value
        },
        updateThemeUrl (state, value) {
            state.video.themeUrl = value.replace('staging.', '')
        },
        updateYtubeId (state, value) {
            state.video.ytubeId = value
        },
        updateOpIndex (state, value) {
            state.opIndex = value
        },
        resetOpIndex (state) {
            state.opIndex = ""
        },
        updatePlayHistory (state, value) {
            state.playHistory.unshift(value)
                if (state.playHistory.length > 10) {
                    state.playHistory.pop()
                }
        },
        updateAnimeStartYear (state, value) {
            state.filters.animeStartYear = value
        },
        updateAnimeEndYear (state, value) {
            state.filters.animeEndYear = value
        },
        resetAnimeStartYear (state) {
            state.filters.animeStartYear = ''
        },
        resetAnimeEndYear (state) {
            state.filters.animeEndYear = ''
        },
        updateTypeFilter (state, value) {
            state.filters.type = value
        }
    }
}

export default ThemesApi