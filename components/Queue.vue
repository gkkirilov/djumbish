<script setup>
import { storeToRefs } from 'pinia'
const store = useStore()
const { queue } = storeToRefs(store)

const removeSong = (index) => {
  queue.value.splice(index, 1);
};

</script>
<template>
  <div class="flex grow flex-col overflow-y-auto bg-gray-900 pb-4">
    <div class="flex h-16 items-center px-3 mb-10 opacity-50 hover:opacity-100 justify-between
        transition-opacity ease-linear duration-300">
      <img class="h-6 w-auto " src="/icon.png" alt="Your Company">
      <span class="text-base font-semibold leading-12 tracking-tighter text-white">DJ <span
          class="pl-0.5">Umbish</span></span>
      <a href="https://twitter.com/gkkirilov" target="_blank">

        <svg viewBox="0 0 24 24" id="twitter" class="w-6">
          <path fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round"
            d="M2 3.5a13.62 13.62 0 0 0 10 5c-.26-1.06-.28-3.94 1.74-5.14a5.24 5.24 0 0 1 2.76-.86A4.65 4.65 0 0 1 19.91 4a10.5 10.5 0 0 0 3-1.14 4.57 4.57 0 0 1-2 2.57 8.77 8.77 0 0 0 2.66-.66 9.3 9.3 0 0 1-2.38 2.43c.71 6.37-5 14.29-13.12 14.29a14.76 14.76 0 0 1-7.5-2 9.3 9.3 0 0 0 7-2 5.82 5.82 0 0 1-5-3.5c1 .32 1.95.48 2.5 0A5.41 5.41 0 0 1 1 9a3.51 3.51 0 0 0 2.5 1A5 5 0 0 1 2 3.5Z">
          </path>
        </svg>
      </a>
    </div>

    <div class="px-3 bg-slate-900 text-lg font-semibold leading-6 text-white">Queue</div>
    <div class="grid text-white">
      <div v-if="queue != []" v-for="(song, index) in queue"
        class="relative flex items-center justify-between px-2 py-3 hover:border-gray-500 group">
        <img class="h-16 w-auto rounded-lg" :src="song.snippet.thumbnails.medium.url" alt="Song Image">
        <div class="min-w-0 flex-auto items-start pl-2">
          <div class="text-sm font-medium text-gray-300 line-clamp-3">{{ song.snippet.title }}</div>
          <!-- <p class="truncate text-sm text-gray-400">3:30</p> -->
        </div>
        <div class="flex-initial flex-col flex space opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button type="button" @click="store.playIndex = index"
            class="rounded bg-white/10 pl-0.5 pt-0.5 pb-0.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20 hover:text-white mb-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-6" viewBox="0 0 19 19" fill="currentColor">
              <path d="M4.5 3.5v13l10-6.5-10-6.5z" />
            </svg>
          </button>
          <button type="button" @click="removeSong(index)"
            class="rounded bg-white/10 pb-1 pl-0.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" stroke-width="1.8"
              stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div class="mt-5 px-3">
      <button type="button"
        class="opacity-75 hover:opacity-100 hover:text-orange-400 transition-opacity duration-300 inline-flex items-center justify-center rounded-md bg-white/10 px-2.5 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-white/20">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor"
          class="w-4 h-4 mr-1.5">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
        </svg>

        <span class="text-white">Make them Dance</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor"
          class="w-4 h-4 ml-1.5">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
        </svg>

    </button>
  </div>
</div></template>
