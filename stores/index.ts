import { defineStore } from 'pinia'

export const useStore = defineStore({
  id: 'Store',
  state: () => ({
    currentlyPlaying: {name: 'Nirvana - Smells like teen spirit'},
    queue: [],
    youtubeList: [],
    playNext: false
   }),
  actions: {}
})
