<template>
<div class="search">
	<div class="searchBox">
		<span>
			<input type="text" v-model="search" placeholder="search...">
		</span>
		<span class="searchButton">
			<button @click="onclickSearch">Search</button>
		</span>
	</div>
	<ul class="searchresults">
		<li v-for="anime in this.animeObjectList" :key="anime.id">
			<h4>
				{{ anime.name }}
				<button @click="this.$store.commit('mergeWithActiveList', anime.opList)">Add to list</button>
				<button @click="this.$store.dispatch('UPDATE_ACTIVE_LIST', {name: anime.name, data: anime.opList})">Create list</button>
			</h4>
			<div v-for="entry in anime.opList" :key="entry.id">
				<span class="searchspan" @click="this.$store.dispatch('UPDATE_CURRENTLY_PLAYING', {theme: entry})">{{ entry.type }} {{ entry.title }}</span> 
				<button @click="this.$store.commit('addActiveListEntry', entry)">+</button>
			</div>
		</li>
	</ul>
</div>
</template>

<script>
import Config from "../../config.js"
import { parseAnimeJson } from "../../helpers"

export default {
	name: "Search",
	data() {
		return {
			search: "",
			animeObjectList: []
		}
	},
	methods: {
		onclickSearch() {
			const SEARCH_REQUEST = Config.BASE_SEARCH_URL + Config.ANIME_FIELDS + "&q=" + this.search
			this.animeObjectList = []

			fetch(SEARCH_REQUEST)
			.then(response => response.json())
			.then(json => {
				for (const index in json['search']['anime']) {
					const animeObj = {}
					animeObj['name'] = json['search']['anime'][index]['name']
					animeObj['opList'] = parseAnimeJson(json['search'], index)

					this.animeObjectList.push(animeObj)
				}
			})
		},
	}
}
</script>

<style>
.search {
	height: 100%;
	display: flex;
	flex-direction: column;
}
.searchresults {
	padding: 0;
	scrollbar-width: thin;
	overflow-y: auto;
	flex: 1 1 0px;
	border-bottom-style: solid;
	border-color: rgb(99, 53, 53);
}
.searchresults li {
	border-style: solid none;
	border-width: 1px;
	border-color: rgb(99, 53, 53);
	padding-bottom: 1em;
	margin-bottom: -1px;
}
.searchspan:hover {
	background: rgb(99, 53, 53);
	cursor: pointer;
}
.search button:hover {
	background: lightgray;
}
.searchresults::-webkit-scrollbar {
  width: 0.5em;
}
.searchresults::-webkit-scrollbar-thumb {
  background-color: Gray;
}
</style>