<template>
	<div class="controlbuttons">
		<button @click="$emit('onclickPause')" id="playPause">Pause</button>
		<button @click="$emit('onclickRandom')">Random</button>
		<button @click="reloadPlayer()">Reload</button>
		<button @click="this.$store.commit('addActiveListEntry', this.$store.state.Themes.video.themeObject)">Add to list</button>
		<button @click="playPrev">Prev</button>
		<button @click="playNext">Next</button>
		<button @click="DT" :class="{toggled: isDt}">DT</button>
		<button @click="NC" :class="{toggled: isNc}">NC</button>
		<input id="yearStartInput" class="yearInput" type="number" v-model="animeStartYear" placeholder="from">
		<button @click="resetStartYear">X</button>
		<span> - </span>
		<input id="yearEndInput" class="yearInput" type="number" v-model="animeEndYear" placeholder="to">
		<button @click="resetEndYear">X</button>
		<select>
			<option disabled value="Type"></option>
			<option @click="changeTypeFilter(0)">All</option>
			<option @click="changeTypeFilter(1)">OP</option>
			<option @click="changeTypeFilter(2)">ED</option>
		</select>
	</div>
</template>

<script>
export default {
	data() {
		return {
			isDt: false,
			isNc: false
		}
	},
	computed: {
		animeStartYear: {
			get () {
				return this.$store.state.Themes.filters.animeStartYear
			},
			set (value) {
				this.$store.commit('updateAnimeStartYear', value)
			}
		},
		animeEndYear: {
			get () {
				return this.$store.state.Themes.filters.animeEndYear
			},
			set (value) {
				this.$store.commit('updateAnimeEndYear', value)
			}
		},
	},
	methods:{
		reloadPlayer() {
			document.getElementById("videoBox").load();
		},
		hotkeys(e) {
			if (e.target.nodeName !== 'INPUT') {
				if (e.code == 'KeyR') {
					this.$emit('onclickRandom')
				}
				else if (e.code == 'KeyK') {
					this.$emit('onclickPause')
				}
			}
		},
		playNext () {
			if (this.$store.state.Themes.opIndex !== "") {
				console.log("play next")
				this.$store.dispatch('PLAY_NEXT')
			}
			else {
				this.$store.dispatch('FETCH_RANDOM_ANIME')
			}
		},
		playPrev () {
			if (this.$store.state.Themes.opIndex !== "") {
				console.log("play prev")
				this.$store.dispatch('PLAY_PREV')
			}
		},
		DT () {
			this.isDt = !this.isDt
			const videoSelector = document.querySelector('video')
			if (this.isDt) {
				videoSelector.defaultPlaybackRate = 1.5
				videoSelector.playbackRate = 1.5
			}
			else {
				videoSelector.defaultPlaybackRate = 1
				videoSelector.playbackRate = 1
			}
		},
		NC () {
			this.isNc = !this.isNc
			const videoSelector = document.querySelector('video')
			if (this.isNc) {
				videoSelector.mozPreservesPitch = false
				videoSelector.preservesPitch = false
			}
			else {
				videoSelector.mozPreservesPitch = true
				videoSelector.preservesPitch = true
			}
		},
		resetStartYear () {
			document.getElementById('yearStartInput').value = ''
			this.$store.commit('resetAnimeStartYear')
		},
		resetEndYear () {
			document.getElementById('yearEndInput').value = ''
			this.$store.commit('resetAnimeEndYear')
		},
		changeTypeFilter (type) {
			// this.$store.state.filterOpType = type
			this.$store.dispatch('CHANGE_TYPE_FILTER', {value: type})
		},
	},
	mounted() {
		document.addEventListener('keyup', this.hotkeys, false);
	}
}
</script>
<style>
.controlbuttons button:hover {
	background: lightgray;
}
.toggled{
	background: gainsboro;
}
.yearInput{
	width: 4rem;
}
</style>