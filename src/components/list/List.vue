<template>
  <div>
    <div>
      <input type="text" v-model="listName" placeholder="List name">
      <button @click="onclickUploadList">Upload</button>
      <button @click="onclickGetComp">Refresh</button>
      {{JSON.stringify(this.compList)}}
      <ul>
        <li v-for="(list, index) in this.compList['data']" :key="index">
          <span @click="onclickGetList(list)">{{ list }}</span>
          <button @click="onclickDeleteList(list)">DELETE</button>
        </li>
      </ul>
      <!-- <ul>
        <li v-for="(op, index) in this.fetchedList" :key="index">
          <span @click="this.$store.commit('updateList', list)">{{ list }}</span>
        </li>
      </ul> -->
    </div>
    <div>
      <ul>
        <li v-for="(entry, index) in this.$store.state.userList" :key="index">
          <span @click="this.$store.commit('updateUrl', {newUrl: entry.opUrl, index: index, sourse: entry.sourse})">{{ entry.title }} {{ index }}</span>
          <button @click="this.$store.commit('removeListEntry', index)">Remove</button>
        </li>
      </ul>
  </div>
  </div>
</template>

<script>
export default {
  name: "List",
  data() {
    return {
      listName: "",
      compList: {},
      fetchedList: []
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
    },
    onclickDeleteList(list) {
      fetch(`//127.0.0.1:5000/api/${list}`, {
        method: 'delete'
      })
    }
  }
}
</script>

<style>

</style>