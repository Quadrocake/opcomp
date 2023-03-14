<template>
<div class="tabs">
    <div class="tabsheader">
        <div v-for="(tab, index) in this.titles" :key="index" @click="selectTab(index)" :class='{"selected": (index == this.selectedTab)}'>{{ tab }}</div>
    </div>
    <menu-tab v-for="(tabName) in menuTabs" :key="tabName" ref="tabs">
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
    data() {
        return {
            selectedTab: 0
        }
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
                this.$refs.tabs[tabIndex].isVisible = (tabIndex === index);
                this.selectedTab = index
            })
        }
    }
}
</script>

<style>
.tabs {
    height: 100%;
    display: flex;
    flex-direction: column;
    /* align-items: stretch; */
}
.tabsheader {
    display: flex;
    justify-content: space-evenly;
}
.tabsheader div {
    padding: 0.5em;
    border-style: none none solid none;
    border-width: 2px;
    border-color: #2a2a2b;
}
/* .tabsheader li {
    padding: 0.3em;
    margin: 0.5em;
} */
.tabsheader div:hover {
    background-color: gray;
    cursor: pointer;
}
.selected {
    border-color: gray !important;
}
</style>