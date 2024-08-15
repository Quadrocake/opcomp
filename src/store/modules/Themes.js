import Config from "../../config.js"
import { parseAnimeJson } from "../../helpers"
import { parseMALJson } from "../../helpers"
import { filterAnimeThemesByType } from "../../helpers"

const Themes = {
	state: () => ({
		opIndex: "",
		ytubePlaying: false,
		audioOnly: false,
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
				filter = filter + '&filter[year-gte]=' + state.filters.animeStartYear
			}
			if (state.filters.animeEndYear) {
				filter = filter + '&filter[year-lte]=' + state.filters.animeEndYear
			}
			return filter
		}
	},
	actions: {
		FETCH_RANDOM_ANIME ({state, getters, commit, dispatch}) {
			const RANDOM_ANIME_REQUEST = Config.BASE_RANDOM_ANIME_REQUEST + Config.ANIME_FIELDS + Config.RANDOM_INCLUDE + getters.GET_FILTER_FIELDS
			
			fetch(RANDOM_ANIME_REQUEST)
			.then(response => response.json())
			.then(json => {
				// random always returns one anime, so index is 0
				const parsedAnimeThemes = parseAnimeJson(json, 0)
				const filteredThemes = filterAnimeThemesByType(parsedAnimeThemes, state.filters.type)

				if (filteredThemes.length) {
					const randomizedTheme = filteredThemes[Math.floor(Math.random() * filteredThemes.length)]
					commit('resetOpIndex')
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
		UPDATE_CURRENTLY_PLAYING ({state, commit}, {theme, index}) {
			commit('updateThemeObject', theme)
			commit('updateVideoUrl', theme)
			if(index !== undefined) {
				commit('updateOpIndex', index)
			}
			if(state.video.themeObject['malId']) {
				const MAL_ANIME_REQUEST = Config.CORS_URL + Config.MAL_URL + state.video.themeObject['malId'] + Config.MAL_FIELDS

				fetch(MAL_ANIME_REQUEST)
				.then(response => response.json())
				.then(json => {
					const parsedMALAnime = parseMALJson(json)
					commit('updateThemeObjectMAL', parsedMALAnime)
				})
			}
		},
		UPDATE_MAL_INFO ({commit}, payload) {
			commit('updateThemeObjectMAL', payload)
		},
		CHANGE_TYPE_FILTER ({ commit }, payload) {
			commit('updateTypeFilter', payload.value)
		},
		TRIGGER_AUDIO_ONLY ({ commit }, payload) {
			commit('updateAudioOnly', payload.isAudio)
		},
		PLAY_NEXT ({state, commit, dispatch, rootState}) {
			console.log(rootState.List.activeList[state.opIndex])
			commit('incrementOpIndex')
			dispatch('UPDATE_CURRENTLY_PLAYING', {theme: rootState.List.activeList[state.opIndex]})
		},
		PLAY_PREV ({state, commit, dispatch, rootState}) {
			commit('decrementOpIndex')
			dispatch('UPDATE_CURRENTLY_PLAYING', {theme: rootState.List.activeList[state.opIndex]})
		}
	},
	mutations: {
		incrementOpIndex (state) {
			state.opIndex = ++state.opIndex % this.state.List.activeList.length
		},
		decrementOpIndex (state) {
			if (state.opIndex == 0) {
				state.opIndex = this.state.List.activeList.length - 1
			}
			else {
				state.opIndex = --state.opIndex
			}
		},
		updateThemeObject (state, value) {
			state.video.themeObject = value
		},
		updateThemeObjectMAL (state, value) {
			state.video.themeObject['MAL'] = value
		},
		updateAnimeThemesList (state, value) {
			state.animeThemesList = value
		},
		updateVideoUrl (state, theme) {
			if (theme.sourse == "themes") {
				state.ytubePlaying = false
				if (state.audioOnly) {
					// because it works
					state.video.themeUrl =  theme.opUrl.replace('v.animethemes.', 'a.animethemes.').replace('.webm', '.ogg')
				}
				else {
					state.video.themeUrl =  theme.opUrl
				}
			}
			else if (theme.sourse == "yt") {
				state.ytubePlaying = true
				state.video.ytubeId = theme.opUrl
			}
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
		},
		updateAudioOnly (state, value) {
			state.audioOnly = value
		}
	}
}

export default Themes