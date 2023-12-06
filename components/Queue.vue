<script setup>
import { storeToRefs } from 'pinia'
const store = useStore()
const { queue } = storeToRefs(store)

const removeSong = (index) => {
  queue.value.splice(index, 1);
};

const playSong = (index) => {
  store.playNext = true;
  var song = queue.value.splice(index, 1);
  queue.value.unshift(song[0])
};


</script>
<template>
  <div class="flex grow flex-col justify-between overflow-y-auto bg-gray-900 pb-4 z-0 border-r-[1px] border-gray-400">
    <div>

      <div class="flex h-16 items-center px-3 mb-10 opacity-50 hover:opacity-100 justify-between
        transition-opacity ease-linear duration-300">
        <a href="https://twitter.com/gkkirilov" target="_blank"><img class="h-6 w-auto " src="/icon.png"
            alt="Your Company"></a>
        <a href="https://twitter.com/gkkirilov" target="_blank"><span
            class="text-base font-semibold leading-12 tracking-tighter text-white">DJ <span
              class="pl-0.5">Umbish.club</span></span></a>
        <a href="https://twitter.com/gkkirilov" target="_blank">
          <svg viewBox="0 0 24 24" id="twitter" class="w-6">
            <path fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round"
              d="M2 3.5a13.62 13.62 0 0 0 10 5c-.26-1.06-.28-3.94 1.74-5.14a5.24 5.24 0 0 1 2.76-.86A4.65 4.65 0 0 1 19.91 4a10.5 10.5 0 0 0 3-1.14 4.57 4.57 0 0 1-2 2.57 8.77 8.77 0 0 0 2.66-.66 9.3 9.3 0 0 1-2.38 2.43c.71 6.37-5 14.29-13.12 14.29a14.76 14.76 0 0 1-7.5-2 9.3 9.3 0 0 0 7-2 5.82 5.82 0 0 1-5-3.5c1 .32 1.95.48 2.5 0A5.41 5.41 0 0 1 1 9a3.51 3.51 0 0 0 2.5 1A5 5 0 0 1 2 3.5Z">
            </path>
          </svg>
        </a>
      </div>

      <div class="px-3 bg-slate-900 text-lg font-semibold leading-6 text-white flex justify-between">
        Queue
        <div class="mb-5 justify-center flex opacity-80">
          <FireButton />
        </div>
      </div>
      <div class="grid text-white">
        <div v-if="queue != []" v-for="(song, index) in queue"
          class="relative flex items-center justify-between px-2 py-3 hover:border-gray-500 group">
          <img class="h-16 w-auto rounded-lg" :src="song.snippet.thumbnails.medium.url" alt="Song Image">
          <div class="min-w-0 flex-auto items-start pl-2">
            <div class="text-sm font-medium text-gray-300 line-clamp-3">{{ song.snippet.title }}</div>
            <!-- <p class="truncate text-sm text-gray-400">3:30</p> -->
          </div>
          <div
            class="flex-initial flex-col flex space md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button type="button" @click="playSong(index)"
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
    </div>
  </div>
</template>
