
<script setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const store = useStore()
const { queue } = storeToRefs(store)
var playerIds = ref([1, 2])
var currentPlayerId = ref(1)
var nextPlayerId = ref(2)
var ytPlayer
var timeoutIds = []

store.$subscribe(async (state, mutation) => {
    if (!ytPlayer) {
        playNextSong();
    }

    if (store.playNext) {
        playTransitionAudioEffect();
        await delay(2000)
        playNextSong();
        store.playNext = false
    }
})

const delay = ms => new Promise(res => setTimeout(res, ms));

function onPlayerStateChange({ data: currentStatus, target: player }) {
    let currentSongEndTime = parseInt(player.getDuration().toFixed()) - 17;
    const currentTime = parseInt(player.getCurrentTime().toFixed());
    audioPlayerOne.value.volume = player.getVolume() / 100
    audioPlayerTwo.value.volume = player.getVolume() / 100
    audioPlayerThree.value.volume = player.getVolume() / 100
    audioPlayerFour.value.volume = player.getVolume() / 100
    audioPlayerFive.value.volume = player.getVolume() / 100

    if (currentStatus === YT.PlayerState.ENDED) {
        if (store.queue.length > 0) {
            playNextSong();
        } else {
            document.getElementById('player-' + currentPlayerId.value).remove()
            ytPlayer = null;
        }
    }

    if (currentStatus === YT.PlayerState.PLAYING) {
        timeoutIds.map(id => clearTimeout(id))
        var id = setTimeout(async () => {
            if (ytPlayer.getPlayerState() === YT.PlayerState.PLAYING) {
                playTransitionAudioEffect();
                await delay(2000)
                playNextSong();
            }
        }, (currentSongEndTime - currentTime) * 1000)
        timeoutIds.push(id);
    }

}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}


function playTransitionAudioEffect() {
    const rndInt = randomIntFromInterval(1, 5)
    switch (rndInt) {
        case 1:
            audioPlayerOne.value.play()
            break;
        case 2:
            audioPlayerTwo.value.play()
            break;
        case 3:
            audioPlayerFour.value.play()
            break;
        case 4:
            audioPlayerFour.value.play()
            break;
        case 5:
            audioPlayerFive.value.play()
            break;
        default:
            audioPlayerFive.value.play()
            break;
    }
}

function playNextSong() {
    if (queue?.value?.length > 0) {
        document.getElementById('player-' + currentPlayerId.value)?.remove()
        currentPlayerId.value = nextPlayerId.value
        nextPlayerId.value = nextPlayerId.value + 1
        playerIds.value.push(nextPlayerId.value)
        let video = queue.value.shift();
        currentSongPlayer(video);
    }
}

const currentSongPlayer = (video) => {
    ytPlayer = new YT.Player('player-' + currentPlayerId.value, {
        height: parseInt(window.innerHeight * 0.30).toString(),
        width: 'auto',
        videoId: video.id.videoId,
        origin: "https://djumbish.club",
        playerVars: {
            autoplay: 1,
            controls: 1,
            showinfo: 0,
            start: 10,
            enablejsapi: 1
        },
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
};

const audioPlayerOne = ref(null);
const audioPlayerTwo = ref(null);
const audioPlayerThree = ref(null);
const audioPlayerFour = ref(null);
const audioPlayerFive = ref(null);
</script>
<template>
    <div>
        <ClientOnly>
            <section class="flex">
                <template v-for="playerId in playerIds">
                    <div :id="'player-' + playerId" class="rounded-lg aspect-video">
                    </div>
                </template>
                <div v-show="!ytPlayer">
                    <div class="text-4xl font-bold tracking-tight text-gray-400 sm:text-2xl text-center">Add songs</div>
                    <br>
                    <br>
                    <div class="text-4xl font-bold tracking-tight text-gray-400 sm:text-2xl text-center lg:hidden">Open sidebar for automix</div>
                </div>
            </section>
        </ClientOnly>
        <BuyAi />
        <audio ref="audioPlayerOne" controls class="hidden">
            <source src="/whoosh.MP3" type="audio/mpeg">
        </audio>
        <audio ref="audioPlayerTwo" controls class="hidden">
            <source src="/rewind.MP3" type="audio/mpeg">
        </audio>
        <audio ref="audioPlayerThree" controls class="hidden">
            <source src="/listen.MP3" type="audio/mpeg">
        </audio>
        <audio ref="audioPlayerFour" controls class="hidden">
            <source src="/shot.MP3" type="audio/mpeg">
        </audio>
        <audio ref="audioPlayerFive" controls class="hidden">
            <source src="/slowdown.MP3" type="audio/mpeg">
        </audio>
    </div>
</template>
<style>
iframe {
    width: 100%;
}
</style>