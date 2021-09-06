<template>
  <div>
      <ul>
          <li v-for="(entry, index) in this.$store.state.userList" :key="index">
              <span @click="this.$store.commit('updateUrl', {newUrl: entry.opUrl, index: index, sourse: entry.sourse})">{{ entry.sourse }}{{ entry.title }} {{ index }}</span>
              <button @click="this.$store.commit('removeListEntry', index)">Remove</button>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
  name: "List"
}
</script>

<style>

</style>