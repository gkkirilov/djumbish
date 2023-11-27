<script setup>
const store = useStore()
import videosExample from '../utils/videos'

function addFiveRandomSongsToQueue() {
  const shuffled = videosExample.sort(() => 0.5 - Math.random());
  shuffled.slice(0, 5).map((song) =>
    store.queue.push(song)
  )
}
</script>
<template>
    <div>
        <button type="button"
            class="opacity-75 hover:opacity-100 hover:text-orange-400 transition-opacity duration-300 inline-flex items-center justify-center rounded-md bg-white/10 px-2.5 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-white/20"
            @click="addFiveRandomSongsToQueue">
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
</template>