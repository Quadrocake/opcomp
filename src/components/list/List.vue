<template>
  <div class="complist">
    <input type="text" v-model="listName" placeholder="List name">
    <button @click="onclickNewList">New</button>
    <button @click="onclickUploadList">Upload</button>
    <button @click="onclickGetComp">Refresh</button>
    <ul>
      <li class="compli" v-for="(list, index) in this.compList['data']" :key="index">
        <span class="compspan" @click="onclickGetList(list)">{{ list }}</span>
        <button @click="onclickDeleteList(list)">DELETE</button>
      </li>
    </ul>
  </div>
  <div class="oplist">
    <ul class="opul">
      <li class="opli" v-for="(entry, index) in this.$store.state.userList" :key="index">
        <span class="opspan" @click="this.$store.commit('updateUrl', {newUrl: entry.opUrl, index: index, sourse: entry.sourse})">{{ entry.title }}</span>
        <button @click="this.$store.commit('removeListEntry', index)">Remove</button>
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
      socket: null
    }
  },
  methods: {
    onclickUploadList() {
      const putData = {}
      putData['data'] = this.$store.state.userList
      fetch(`//127.0.0.1:5000/api/${this.listName}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(putData)
      })
    },
    onclickGetComp() {
      fetch("//127.0.0.1:5000/api")
      .then(response => response.json())
      .then(json => this.compList = json)
    },
    onclickGetList(list) {
      fetch(`//127.0.0.1:5000/api/${list}`)
      .then(response => response.json())
      .then(json => {this.$store.commit('updateList', json['data']); console.log(json['data'])})
      .then(this.listName = list)
    },
    onclickDeleteList(list) {
      fetch(`//127.0.0.1:5000/api/${list}`, {
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
}
.oplist {
  grid-column: 3;
}
ul {
  list-style-type: none;
  padding: 0;
  overflow-y: auto;
  
  /* row-gap: 20px; */
  display: grid;
  /* flex-direction: column; */
  width: 350px;
  /* flex-wrap: wrap; */
    height: 570px;
}

li {
  display: flex;
  width: 300px;

  border-style: solid none;
  /* border-left-style: solid; */
  /* border-right-style: none; */
  border-width: 1px 1px 1px 5px;
  border-color: darkgray;
  background: #353839;
  margin-bottom: -1px;
  min-height: 40px;
}
/* .complist button, .oplist button {
  border-style: none solid none none;
  border-width: 1px;
} */
button:hover {
  background: lightgray;
}
.opspan, .compspan {
  width: 100%;
  cursor: pointer;
  
  margin-top: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  /* display: flex;
  align-items: center;
  vertical-align: middle; */
}
.opspan:hover, .compspan:hover {
  background: lightgray;
}
</style>