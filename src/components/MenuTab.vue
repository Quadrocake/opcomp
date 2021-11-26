<template>
    <div v-show="isVisible">
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

</style>