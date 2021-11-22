<template>
	<div class="complist">
		<div class="compbutton">
			<input type="text" v-model="listName" placeholder="List name">
			<button @click="newList">New</button>
			<button @click="uploadList">Upload</button>
			<button @click="fetchCompList">Refresh</button>
		</div>
		<ul class="compul">
			<li class="compli" v-for="(list, index) in this.$store.state.List.compList" :key="index">
				<span class="compspan" @click="fetchOpList(list)">
					<span>{{ list }}</span>
				</span>
				<button class="dangerbutton" @click="deleteList(list)">DELETE</button>
			</li>
		</ul>
	</div>
</template>

<script>
import Config from "../../config.js"
import socket from "../../socket.js"
export default {
	name: "CompList",
	data() {
		return {
			
		}
	},
	computed: {
		listName: {
			get () {
				return this.$store.state.List.activeListName
			},
			set (value) {
				this.$store.commit('updateListName', value)
			}
		}
	},
	methods: {
		// move fetches to store
		uploadList() {
			const uploadData = {}
			uploadData['data'] = this.$store.state.List.activeList
			fetch(Config.BACKEND_URL + "/" + this.$store.state.List.activeListName, {
				method: 'put',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(uploadData)
			})
		},
		newList() {
			this.$store.commit('updateListName', "")
			this.$store.commit('updateActiveList', [])
		},
		fetchCompList () {
			fetch(Config.BACKEND_URL)
			.then(response => response.json())
			.then(json => this.$store.commit('updateCompList', json['data']))
		},
		fetchOpList(list) {
			fetch(Config.BACKEND_URL + "/" + list)
			.then(response => response.json())
			.then(json => {this.$store.commit('updateActiveList', json['data']); 
				console.log(json['data'])
				this.$store.commit('updateListName', list)
				// this.$store.commit('resetOpIndex')
				})
		},
		// add confirmation window
		deleteList(list) {
			fetch(Config.BACKEND_URL + "/" + list, {
				method: 'delete'
			})
		}
	},
	created() {
		socket.on("db update", () => {
			this.fetchCompList()
		})
	},
	mounted() {
		this.fetchCompList()
	}
}
</script>

<style>
.compbutton button:hover {
  background: lightgray;
}
.dangerbutton:hover {
  background: lightcoral;
}
.complist {
  grid-column: 1;
  display: flex;
  flex-direction: column;
}
.compul {
  list-style-type: none;
  padding: 0;
  overflow-y: auto;
  width: 100%;
  flex: 1 1 0px;
  scrollbar-width: none;
  border-bottom-style: solid;
  border-color: rgb(99, 53, 53);
}
.compli {
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
.complist button {
  background: #2a2a2b;
  height: 100%;
  border: none;
  /* max-height: 2em; */
}
.compspan {
  width: 100%;
  cursor: pointer;
  
  margin-left: 5px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: flex;
  align-items: center;
  vertical-align: middle;
}
.complist li:hover {
  background: rgb(99, 53, 53);
}
ul::-webkit-scrollbar {
  display: none;
}
</style>