const List = {
	state: () => ({
		compList: [],
		activeList: [],
		activeListName: ""
	}),

	getters: {

	},
	actions: {

	},
	mutations: {
		updateActiveList (state, value) {
			state.activeList = value
		},
		shuffleActiveList (state) {
			let currentIndex = state.activeList.length, randomIndex
			while (currentIndex != 0) {
				randomIndex = Math.floor(Math.random() * currentIndex)
				currentIndex--
		
				[state.activeList[currentIndex], state.activeList[randomIndex]] = [state.activeList[randomIndex], state.activeList[currentIndex]]
			}
		},
		addActiveListEntry (state, value) {
			state.activeList.push(value)
		},
		removeActiveListEntry (state, index) {
			state.activeList.splice(index, 1)
		},
		updateCompList (state, value) {
			state.compList = value
		},
		updateListName (state, value) {
			state.activeListName = value
		}
	}
}

export default List