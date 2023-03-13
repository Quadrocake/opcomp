<template>
	<div class="oplist">
		<span v-if="this.$store.state.List.activeListName" id="listName">
			{{ this.$store.state.List.activeListName }}
		</span>
		<span>
      <button class="opbutton" @click="this.oplistHidden = !this.oplistHidden">Hide</button>
			<button class="opbutton" @click="this.$store.commit('shuffleActiveList')">Random</button>
      <button class="opbutton" @click="this.$store.commit('storeCopiedList')">Copy</button>
      <button class="opbutton" @click="this.$store.commit('mergeCopiedList')">Paste</button>
      <button class="opbutton" @click="this.$store.commit('sortActiveListOpAlphabet')">A↓ (OP)</button>
      <button class="opbutton" @click="this.$store.commit('sortActiveListAnimeAlphabet')">A↓ (Anime)</button>
      <input class="seedinput" type="text" @input="updateRandomSeed" placeholder="seed">
		</span>
		<ul v-show="!this.oplistHidden" class="opul">
			<li class="opli" v-for="(entry, index) in this.$store.state.List.activeList" :key="index">
				<span v-bind:class="{ currentlyPlaying: (this.$store.state.Themes.opIndex == index && this.$store.state.Themes.video.themeObject.opUrl == entry.opUrl) }" 
					class="index">
					{{ index + 1}}
				</span>
				<span class="opspan" @click="this.$store.dispatch('UPDATE_CURRENTLY_PLAYING', {theme: entry, index: index})">
					<div>{{ entry.title }}</div>
					<div class="smallerFont">{{ entry.anime }}</div>
				</span>
				<button class="dangerbutton" @click="this.$store.commit('removeActiveListEntry', index)">Remove</button>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: "ActiveList",
	data() {
		return {
			oplistHidden: false
		}
	},
  methods: {
    updateRandomSeed (e) {
      this.$store.commit('updateRandomSeed', e.target.value)
    }
  }
}
</script>

<style>
.seedinput {
  width: 5em;
}
.oplist li:hover {
  background: rgb(99, 53, 53);
}
.dangerbutton:hover {
  background: lightcoral;
}
.opbutton:hover {
  background: lightgray;
}
.oplist {
  grid-column: 3;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.opul {
  list-style-type: none;
  padding: 0;
  overflow-y: auto;
  
  width: 100%;
  flex: 1 1 0px;
  scrollbar-width: thin;
  border-bottom-style: solid;
  border-color: rgb(99, 53, 53);
}
.opli {
  display: flex;
  width: 100%;
  min-width: 0;
  border-style: solid none;
  border-width: 1px;
  border-color: rgb(99, 53, 53);
  background: #2a2a2b;
  margin-bottom: -1px;
  height: 2.5em;
}
.oplist ul::-webkit-scrollbar {
  width: 0.5em;
}
.oplist ul::-webkit-scrollbar-thumb {
  background-color: Gray;
}
.opspan {
  width: 100%;
  cursor: pointer;
  
  margin-left: 5px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: left;
  vertical-align: center;
}
.oplist button {
  background: #2a2a2b;
  height: 1.5rem;
  border: none;
}
.index {
  width: calc(1.2rem + 1vmin);
  color: #353839;
  font-size: calc(0.40rem + 1vmin);
}
#listName {
  border-style: solid;
  border-width: 2px;
  border-color: rgb(99, 53, 53);
  border-radius: 1rem;
  padding: 0.10rem 1rem;
  text-align: center;
}
.smallerFont {
  font-size: calc(0.40rem + 1vmin);
  color: Gray;
}
.currentlyPlaying {
  background: rgb(99, 53, 53);
}
</style>