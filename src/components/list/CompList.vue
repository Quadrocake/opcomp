<template>
	<div class="complist">
		<input type="text" v-model="listName" placeholder="List name">
		<div class="compbutton">
			<button @click="newList">New</button>
			<button @click="uploadList">Upload</button>
			<button @click="fetchCompList">Refresh</button>
			<input type="text" v-model="malJson" placeholder="json">
			<button @click="readMalJson">Parse</button>
		</div>
		<ul class="compul">
			<li class="compli" v-for="(list, index) in this.$store.state.List.compList" :key="index">
				<span class="compspan" @click="fetchOpList(list)">
					<span>{{ list }}</span>
				</span>
				<!-- <button class="dangerbutton" @click="deleteList(list)">DELETE</button> -->
				<div>
					<button class="dangerbutton" @click="confirmCompDelete(list)">DELETE</button>
					<confirm-dialogue ref="confirmDialogue"></confirm-dialogue>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
import ConfirmDialogue from "./ConfirmDialogue.vue"
import Config from "../../config.js"
import socket from "../../socket.js"
import { parseMalJson } from "../../helpers"

export default {
	name: "CompList",
	components: { ConfirmDialogue },
	data() {
		return {
			malJson: ""
		}
	},
	computed: {
		listName: {
			get () {
				return this.$store.state.List.activeListName
			},
			set (value) {
				this.$store.commit('updateActiveListName', value)
			}
		}
	},
	methods: {
		async confirmCompDelete(list) {
            const ok = await this.$refs.confirmDialogue.show({
                title: 'Delete list?',
                message: 'This will PERMANENTLY delete ' + list,
                okButton: 'DELETE',
            })
            // If you throw an error, the method will terminate here unless you surround it wil try/catch
            if (ok) {
				this.deleteList(list)
            }
        },
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
			this.$store.dispatch('UPDATE_ACTIVE_LIST', {name: "", data: []})
		},
		fetchCompList () {
			fetch(Config.BACKEND_URL)
			.then(response => response.json())
			.then(json => this.$store.commit('updateCompList', json['data']))
		},
		fetchOpList(list) {
			fetch(Config.BACKEND_URL + "/" + list)
			.then(response => response.json())
			.then(json => {
				this.$store.dispatch('UPDATE_ACTIVE_LIST', {name: list, data: json['data']})

				console.log(json['data'])
				
				// this.$store.commit('resetOpIndex')
				})
		},
		deleteList(list) {
			fetch(Config.BACKEND_URL + "/" + list, {
				method: 'delete'
			})
			.then(() => alert('You have successfully deleted' + list))
		},
		readMalJson() {
			this.$store.dispatch('UPDATE_ACTIVE_LIST', {name: "mal", data: parseMalJson(JSON.parse(this.malJson))})
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
  display: flex;
  flex-direction: column;
  height: 100%;
}
.compul {
  list-style-type: none;
  padding: 0;
  overflow-y: auto;
  width: 100%;
  
  flex: 1 1 0px;
  scrollbar-width: thin;
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
  /* background: #2a2a2b; */
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
.complist ul::-webkit-scrollbar {
  width: 0.5em;
}
.complist ul::-webkit-scrollbar-thumb {
  background-color: Gray;
}
</style>