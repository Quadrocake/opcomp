<template>
  <div class="complist">
    <div>
      <input type="text" v-model="listName" placeholder="List name">
      <button @click="onclickNewList">New</button>
      <button @click="onclickUploadList">Upload</button>
      <button @click="onclickGetComp">Refresh</button>
    </div>
    <ul>
      <li class="compli" v-for="(list, index) in this.compList['data']" :key="index">
        <span class="compspan" @click="onclickGetList(list)">{{ list }}</span>
        <button class="dangerbutton" @click="onclickDeleteList(list)">DELETE</button>
      </li>
    </ul>
  </div>
  <div class="oplist">
    <button @click="this.$store.commit('shuffleList')">Random</button>
    <button @click="this.oplistHidden = !this.oplistHidden">Hide</button>
    <ul v-show="!this.oplistHidden" class="opul">
      <li class="opli" v-for="(entry, index) in this.$store.state.userList" :key="index">
        <span class="index">{{ index + 1}}</span>
        <span class="opspan" @click="this.$store.commit('updateUrl', {newUrl: entry.opUrl, index: index, sourse: entry.sourse})">{{ entry.title }}</span>
        <button class="dangerbutton" @click="this.$store.commit('removeListEntry', index)">Remove</button>
      </li>
    </ul>
</div>
</template>

<script>
import socket from '../../socket.js'

export default {
  name: "List",
  data() {
    return {
      listName: "",
      compList: {},
      fetchedList: [],
      socket: null,
      oplistHidden: false
    }
  },
  methods: {
    onclickUploadList() {
      const putData = {}
      putData['data'] = this.$store.state.userList
      fetch(`//${this.$store.state.appUrl}/api/${this.listName}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(putData)
      })
    },
    onclickGetComp() {
      fetch(`//${this.$store.state.appUrl}/api`)
      .then(response => response.json())
      .then(json => this.compList = json)
    },
    onclickGetList(list) {
      fetch(`//${this.$store.state.appUrl}/api/${list}`)
      .then(response => response.json())
      .then(json => {this.$store.commit('updateList', json['data']); console.log(json['data'])})
      .then(this.listName = list)
    },
    onclickDeleteList(list) {
      fetch(`//${this.$store.state.appUrl}/api/${list}`, {
        method: 'delete'
      })
    },
    onclickNewList() {
      this.listName = ""
      this.$store.commit('clearUserList')
    }
  },
  created() {
    this.socket = socket
    socket.on("db update", () => {
    this.onclickGetComp()
  })
  },
  mounted() {
    this.onclickGetComp()
  }
}
</script>

<style>
.complist {
  grid-column: 1;
  display: flex;
  flex-direction: column;
}
.oplist {
  grid-column: 3;
  display: flex;
  flex-direction: column;
}
ul {
  list-style-type: none;
  padding: 0;
  overflow-y: auto;
  
  /* row-gap: 20px; */
  /* display: grid;
  flex-direction: column; */
  width: 100%;
  flex: 1 1 0px;

  /* flex-wrap: wrap; */
  /* height: 570px; */
  scrollbar-width: none;
}
ul::-webkit-scrollbar {
  display: none;
}
li {
  display: flex;
  width: 100%;
  min-width: 0;

  border-style: solid none;
  border-width: 1px;
  border-color: #353839;
  background: #2a2a2b;
  margin-bottom: -1px;
  height: 40px;
}
.complist button, .oplist button {
  background: #2a2a2b;
}
button:hover {
  background: lightgray;
}
.dangerbutton:hover {
  background: lightcoral !important;
}
.opspan, .compspan {
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
li:hover {
  background: lightgray;
}
.index {
  width: 20px;
  color: #353839;
}
input {
  height: 25px;
}
</style>