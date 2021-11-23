<template>
	<div class="popup-modal" v-if="isVisible">
		<div class="window">
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
	name: 'PopupModal',
	data() {
		return {
			isVisible: false,
		}
	},
	methods: {
		open() {
			this.isVisible = true
		},
		close() {
			this.isVisible = false
		},
	},
}
</script>

<style>
.popup-modal {
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    z-index: 1;
}

.window {
    background: #2a2a2b;
    border-radius: 5px;
    /* box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2); */
    max-width: 480px;
    margin-left: auto;
    margin-right: auto;
    padding: 1rem;
}
</style>