<template>
    <div>
        <div>
            <h4>
                <a href="https://anison.fm/">anison.fm</a>
            </h4>
            <audio id="anison" controls src="https://pool.anison.fm/AniSonFM(320)" type="audio/mpeg"></audio>
            <button @click="pauseAnison">Play</button>
        </div>
        <div>
            <h4>
                <a href="https://r-a-d.io/">r-a-d.io</a>
            </h4>
            <audio id="adio" controls src="https://relay0.r-a-d.io/main.mp3" type="audio/mpeg"></audio>
            <button @click="pauseAdio">Play</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
		return {
			isAnisonPlaying: false,
			isAdioPlaying: false
		}
	},
    methods: {
        pauseAnison () {
            const player = document.getElementById('anison')
            
            if (this.isAnisonPlaying) {
                player.pause()
            }
            else {
                player.load()
                player.play()
            }
            this.isAnisonPlaying = !this.isAnisonPlaying
        },
        pauseAdio () {
            const player = document.getElementById('adio')
            
            if (this.isAdioPlaying) {
                player.pause()
            }
            else {
                player.load()
                player.play()
            }
            this.isAdioPlaying = !this.isAdioPlaying
        }
    }
}
</script>

<style>

</style>