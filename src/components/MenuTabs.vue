<template>
<div class="tabs">
    <ul class="tabsheader">
        <li v-for="(tab, index) in this.titles" :key="index" @click="selectTab(index)">{{ tab }}</li>
    </ul>
    <menu-tab v-for="(tabName, index) in menuTabs" :key="tabName" :ref="`tab-${index}`">
        <slot :name="tabName"></slot>
    </menu-tab>
</div>
</template>

<script>
import MenuTab from "./MenuTab.vue"

export default {
    components: {
        MenuTab
    },
    props: {
        titles: Array,
        menuTabs: Array
    },
    mounted () {
        this.selectTab(0)
    },
    methods: {
        selectTab (index) {
            this.menuTabs.forEach((tab,tabIndex) => {
                this.$refs[`tab-${tabIndex}`].isVisible = (tabIndex === index);
            })
        }
    }
}
</script>

<style>
.tabsheader {
    list-style: none;
    padding: 0;
    display: flex;
}
.tabsheader li {
    padding: 0.3em;
    margin: 0.5em;
}
.tabsheader li:hover {
    background-color: gray;
    cursor: pointer;
}
</style>