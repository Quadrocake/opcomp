var Chance = require('chance');

const List = {
	state: () => ({
		compList: [],
		activeList: [],
		activeListName: "",
		randomSeed: null
	}),

	getters: {

	},
	actions: {
		UPDATE_ACTIVE_LIST ({commit}, {name, data}) {
			commit('updateActiveListData', data)
			commit('updateActiveListName', name)
		}
	},
	mutations: {
		updateActiveListData (state, value) {
			state.activeList = value
		},
		updateActiveListName (state, value) {
			state.activeListName = value
		},
		mergeWithActiveList (state, value) {
			state.activeList = state.activeList.concat(value)
		},
		shuffleActiveList (state) {
			var random = new Chance(state.randomSeed);

			let currentIndex = state.activeList.length, randomIndex
			while (currentIndex != 0) {
				randomIndex = Math.floor(random.random() * currentIndex)
				currentIndex--
		
				[state.activeList[currentIndex], state.activeList[randomIndex]] = [state.activeList[randomIndex], state.activeList[currentIndex]]
			}
		},
		sortActiveListOpAlphabet (state) {
			state.activeList.sort((a, b) => a.title.localeCompare(b.title))
		},
		sortActiveListAnimeAlphabet (state) {
			state.activeList.sort((a, b) => a.anime.localeCompare(b.anime))
		},
		updateRandomSeed (state,value) {
			state.randomSeed = value
		},
		addActiveListEntry (state, value) {
			state.activeList.push(value)
		},
		removeActiveListEntry (state, index) {
			state.activeList.splice(index, 1)
		},
		updateCompList (state, value) {
			state.compList = value
		}
	}
}

export default List