<template>
    <div class="leftmenu">
        <menu-tabs :titles="tabTitles" :menuTabs="tabTitles">
            <template v-slot:Playlists >
                <menu-tab id="complisttab">
                    <CompList />
                </menu-tab>
            </template>
            <template v-slot:Search>
                <menu-tab>
                    <Search />
                </menu-tab>
            </template>
            <template v-slot:SearchYT>
                <menu-tab>
                    <SearchYT />
                </menu-tab>
            </template>
            <template v-slot:Radio>
                <menu-tab>
                    <Radios />
                </menu-tab>
            </template>
        </menu-tabs>
    </div>
</template>

<script>
import MenuTabs from "../MenuTabs.vue"
import MenuTab from "../MenuTab.vue"
import CompList from "../list/CompList.vue"
import Search from "../search/Search.vue"
import SearchYT from "../search/SearchYT.vue"
import Radios from "../video/Radios.vue"

export default {
    components: {
        MenuTabs,
        MenuTab,
        CompList,
        Search,
        SearchYT,
        Radios
    },
    data () {
        return {
            tabTitles: ["Playlists","Search","SearchYT","Radio"]
        }
    }
}
</script>

<style>
#complisttab {
    height: 100%;
}
.leftmenu {
    height: 100%;
}
</style>