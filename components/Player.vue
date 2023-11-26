
<script setup>
import { storeToRefs } from 'pinia'

const store = useStore()
const { queue } = storeToRefs(store)
var playerIds = ref([1, 2])
var currentPlayerId = ref(1)
var nextPlayerId = ref(2)
var ytPlayer
store.$subscribe((state, mutation) => {
    console.log('event')
    if (!ytPlayer) {
        playNextSong();
    }
    if (state.playIndex) {
        playNextSong(playIndex);
        store.playIndex = null
    }
})

function onPlayerStateChange({ data: currentStatus, target: player }) {
    let currentSongEndTime = player.getDuration() - 15;
    const currentTime = player.getCurrentTime();

    if (currentStatus === YT.PlayerState.ENDED) {
        playNextSong();
    }
    if (currentStatus === YT.PlayerState.PLAYING) {
        setTimeout(() => {
            playNextSong();
        }, (currentSongEndTime - currentTime) * 1000);
    }
}

function playNextSong(songIndex) {
    if (queue?.value?.length > 0) {
        let video
        document.getElementById('player-' + currentPlayerId.value).remove()
        currentPlayerId.value = nextPlayerId.value
        nextPlayerId.value = nextPlayerId.value + 1
        playerIds.value.push(nextPlayerId.value)
        if (songIndex) {
            video = queue.splice(index, 1)[0];
        } else {
            video = queue.value.shift();
        }
        currentSongPlayer(video);
    }
}

function calculateTwentyPercentOfViewportHeight() {
    return parseInt(window.innerHeight*0.30);
}

const currentSongPlayer = (video) => {
    ytPlayer = new YT.Player('player-' + currentPlayerId.value, {
        height: calculateTwentyPercentOfViewportHeight().toString(),
        width: 'auto',
        videoId: video.id.videoId,
        origin: "http://localhost:8000",
        playerVars: {
            autoplay: 1,
            controls: 1,
            showinfo: 0,
            start: 10
        },
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
};

import { ref } from 'vue'
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'

const enabled = ref(false)
</script>
<template>
    <div>
        <section class="flex">
            <template v-for="playerId in playerIds">
                <div :id="'player-' + playerId" class="rounded-lg aspect-video">
                </div>
            </template>
        </section>
        <section class="flex mt-5 px-4">
            <SwitchGroup as="div" class="flex items-center opacity-50">
                <Switch v-model="enabled"
                    :class="[enabled ? 'bg-indigo-600' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2']">
                    <span
                        :class="[enabled ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']">
                        <span
                            :class="[enabled ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in', 'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity']"
                            aria-hidden="true">
                            <svg class="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                                <path d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </span>
                        <span
                            :class="[enabled ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out', 'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity']"
                            aria-hidden="true">
                            <svg class="h-3 w-3 text-indigo-600" fill="currentColor" viewBox="0 0 12 12">
                                <path
                                    d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                            </svg>
                        </span>
                    </span>
                </Switch>
                <SwitchLabel as="span" class="ml-3 text-sm">
                    <span class="font-medium text-lg">AI Auto mixer</span>
                </SwitchLabel>
            </SwitchGroup>
            <div class="text-xs pl-2">
                Coming Soon
            </div>

        </section>
</div></template>
<style>iframe {
    width: 100%;
}</style>