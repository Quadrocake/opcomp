<template>
<div class="videoinfo">
	<div class="controlbuttons">
		<button @click="showHistory = !showHistory">History</button>
		<button @click="showAllOps = !showAllOps">All OPs</button>
	</div>
	<div v-if="this.$store.state.Themes.video.themeObject">
		<p class="videoInfoLine">{{ this.$store.state.Themes.video.themeObject['anime'] }}</p> &nbsp;
		<p class="videoInfoLine" v-if="this.$store.state.Themes.video.themeObject['type']">{{ this.$store.state.Themes.video.themeObject['type'] }}</p> &nbsp;
		<p class="videoInfoLine">{{ this.$store.state.Themes.video.themeObject['title'] }}</p> <br />
		<div class="videoInfoLine" v-if="this.$store.state.Themes.video.themeObject['artists']">
			<div class="videoInfoLine smallerFont">Artist: </div> 
			<!-- <div class="videoInfoLine">{{ this.$store.state.Themes.video.themeObject['artists'] }}</div> -->
			<li v-for="artist in this.$store.state.Themes.video.themeObject['artists']" :key="artist">
				{{ artist }}
			</li>
		</div>
		<div v-if="this.$store.state.Themes.video.themeObject['year']">
			<div class="videoInfoLine smallerFont">Year: </div> 
			<div class="videoInfoLine">{{ this.$store.state.Themes.video.themeObject['year'] }}</div>
		</div>
	</div>
	<div>
		<ul v-if="showHistory" id="historylist">
			<li class="historyli" v-for="entry in this.$store.state.Themes.playHistory" :key="entry.opId">
				<span class="opline" @click="this.$store.dispatch('UPDATE_CURRENTLY_PLAYING', {theme: entry})">
					<div class="historyspan">{{ entry.anime }}</div> &nbsp;
					<div class="historyspan">{{ entry.type }}</div> &nbsp;
					<div class="historyspan">{{ entry.title }}</div>
				</span>
			</li>
		</ul>
	</div>
	<div>
	<ul v-if="showAllOps" id="historylist">
		<button @click="this.$store.commit('mergeWithActiveList', this.$store.state.Themes.animeThemesList)">Add to list</button>
		<button @click="this.$store.dispatch('UPDATE_ACTIVE_LIST', {name: this.$store.state.Themes.animeThemesList[0].anime, data: this.$store.state.Themes.animeThemesList})">Create list</button>
		<li class="historyli" v-for="entry in this.$store.state.Themes.animeThemesList" :key="entry.opId">
			<span class="opline" @click="this.$store.dispatch('UPDATE_CURRENTLY_PLAYING', {theme: entry})">
				<div class="historyspan">{{ entry.anime }}</div> &nbsp;
				<div class="historyspan">{{ entry.type }}</div> &nbsp;
				<div class="historyspan">{{ entry.title }}</div>
			</span>
		</li>
	</ul>
	</div>
</div>
</template>

<script>
export default {
	data() {
		return {
			showHistory: false,
			showAllOps: false
		}
	}
}
</script>

<style>
.videoinfo button:hover {
  background: lightgray;
  cursor: pointer;
}
.videoInfoLine, .historyspan {
  display: inline;
}
#historylist {
  list-style-type: none;
}
.opline:hover {
  background: rgb(99, 53, 53);
  cursor: pointer;
}
.smallerFont {
  font-size: calc(0.40rem + 1vmin);
  color: Gray;
}
</style>