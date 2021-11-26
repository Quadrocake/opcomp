<template>
    <div v-show="isVisible" class="tabcontent">
        <slot></slot>
    </div> 
</template>

<script>
export default {
    data () {
        return {
            isVisible: true
        }
    }
}
</script>

<style>
.tabcontent {
    height: 100%;
}
</style>