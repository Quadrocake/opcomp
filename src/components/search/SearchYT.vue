<template>
	<div class="search">
		<div>
			<span class="searchBox">
				<input type="text" v-model="searchQuery" placeholder="youtube...">
			</span>
			<span class="searchButton">
				<button @click="onclickSearchYT">Search</button>
			</span>
		</div>
		<ul class="searchresults">
			<li class="searchContainer" v-for="entry in this.ytObjectList" :key="entry.opUrl">
				<img class="searchRes" :src="entry.thumbnail" alt="no img">
				<p @click="this.$store.dispatch('UPDATE_CURRENTLY_PLAYING', {theme: entry})">{{ entry.title }}</p> 
				<button @click="this.$store.commit('addActiveListEntry', entry)">Add to list</button>
			</li>
		</ul>
	</div>
</template>

<script>
import Config from "../../config.js"
import { parseYtJson } from "../../helpers"

export default {
	name: "SearchYT",
	data() {
		return {
		searchQuery: "",
		ytObjectList: []
		}
	},
	methods: {
		onclickSearchYT () {
			const query = Config.BASE_YT_SEARCH_URL + this.searchQuery
			
			fetch(query)
			.then(response => response.json())
			.then(json => {
				this.ytObjectList = parseYtJson(json['items'])
			})
		}
	}
}
</script>

<style>
.searchRes {
	float: left;
	/* vertical-align: bottom; */
}
.searchContainer {
	overflow: auto
}
</style>