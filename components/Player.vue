
<script setup>
import { storeToRefs } from 'pinia';

const store = useStore()
const { queue } = storeToRefs(store)
var playerIds = ref([1, 2])
var currentPlayerId = ref(1)
var thankyou = ref(false)
var nextPlayerId = ref(2)
var ytPlayer
store.$subscribe((state, mutation) => {
    if (!ytPlayer) {
        playNextSong();
    }

    if (store.playNext) {
        playNextSong();
        store.playNext = false
    }
})

function onPlayerStateChange({ data: currentStatus, target: player }) {
    let currentSongEndTime = player.getDuration() - 15;
    const currentTime = player.getCurrentTime();

    if (currentStatus === YT.PlayerState.ENDED) {
        if (store.queue.length > 0) {
            playNextSong();
        } else {
            document.getElementById('player-' + currentPlayerId.value).remove()
            ytPlayer = null;
        }
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
        document.getElementById('player-' + currentPlayerId.value)?.remove()
        currentPlayerId.value = nextPlayerId.value
        nextPlayerId.value = nextPlayerId.value + 1
        playerIds.value.push(nextPlayerId.value)
        video = queue.value.shift();
        currentSongPlayer(video);
    }
}

function calculateHeight() {
    return parseInt(window.innerHeight * 0.30);
}

const currentSongPlayer = (video) => {
    ytPlayer = new YT.Player('player-' + currentPlayerId.value, {
        height: calculateHeight().toString(),
        width: 'auto',
        videoId: video.id.videoId,
        origin: "http://localhost:8000",
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

import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue';
import { ref, watch } from 'vue';

const enabled = ref(false)

import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
const open = ref(false)
watch(enabled, (newValue) => {
    if (newValue == true) {
        // Open the modal when the switch is checked
        open.value = true;
        enabled.value = false
    }
});

function changeThankyou() {
    thankyou.value = true
}

</script>
<template>
    <div>
        <ClientOnly>

            <section class="flex">
                <template v-for="playerId in playerIds">
                    <div :id="'player-' + playerId" class="rounded-lg aspect-video">
                    </div>
                </template>
            </section>
        </ClientOnly>
        <section class="flex mt-2 lg:mt-5 px-4">
            <SwitchGroup as="div"
                class="flex items-center opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
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
                <SwitchLabel as="span" class="ml-3 text-sm items-center flex">
                    <span class="font-medium text-lg">AI Auto mixer</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-5 h-5 inline ml-2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                    </svg>
                </SwitchLabel>
            </SwitchGroup>
        </section>
        <TransitionRoot as="template" :show="open">
            <Dialog as="div" class="relative z-100" @close="open = false">
                <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                    leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </TransitionChild>

                <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <TransitionChild as="template" enter="ease-out duration-300"
                            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                            leave-from="opacity-100 translate-y-0 sm:scale-100"
                            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                            <DialogPanel
                                class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:p-6">
                                <div v-show="!thankyou">
                                    <div
                                        class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-indigo-600">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                                        </svg>

                                    </div>
                                    <div class="mt-3 text-start sm:mt-5">
                                        <DialogTitle as="h3"
                                            class="text-base text-center font-semibold leading-6 text-gray-900">
                                            AI Auto Mixer
                                        </DialogTitle>
                                        <dl
                                            class="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                                            <div class="relative pl-9">
                                                <dt class="inline font-semibold text-gray-900">
                                                    <svg class="absolute left-1 top-1 h-6 w-6 text-indigo-600"
                                                        viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                                                    </svg>
                                                    Seamless PartyMix
                                                </dt>
                                                <dd class="inline"> uses AI to blend the current and next songs in your
                                                    playlist with a selection of dynamic DJ effects.</dd>
                                            </div>
                                            <div class="relative pl-9">
                                                <dt class="inline font-semibold text-gray-900">
                                                    <svg class="absolute left-1 top-1 h-6 w-6 text-indigo-600"
                                                        viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                                                    </svg>
                                                    EnergyFlow
                                                </dt>
                                                <dd class="inline">Keep the Party Pumping with Non-Stop, High-Octane Beats
                                                    by matching the next song tempo automatically!</dd>
                                            </div>

                                        </dl>
                                    </div>
                                </div>
                                <div v-show="!thankyou" class="mt-5 sm:mt-6">
                                    <button type="button"
                                        class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        @click="changeThankyou">I want it</button>
                                </div>

                                <div v-show="thankyou">
                                    <div
                                        class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-green-600">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                                        </svg>

                                    </div>
                                    <div class="mt-3 text-start sm:mt-5">
                                        <DialogTitle as="h3"
                                            class="text-base text-center font-semibold leading-6 text-gray-900">
                                            Coming soon!
                                        </DialogTitle>
                                        <div class="mt-2">
                                            <p class="text-sm text-gray-700 text-center">Sign up for notification when we
                                                launch the feature.</p>
                                            <div class="sm:col-span-4 mt-12">
                                                <label for="email"
                                                    class="block text-sm font-medium leading-6 text-gray-900">Email
                                                    address</label>
                                                <div class="mt-2">
                                                    <input id="email" name="email" type="email" autocomplete="email"
                                                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div v-show="thankyou" class="mt-5 sm:mt-6">
                                    <button type="button"
                                        class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        @click="open = false">Submit</button>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>
    </div>
</template>
<style>
iframe {
    width: 100%;
}</style>