<script setup>

import videosExample from '../utils/videos';
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue';
import { ref } from 'vue';

const store = useStore()
const enabled = ref(false)

function addRandomSongsToQueue() {
    if (enabled.value && store.queue.length < 5) {
        const shuffled = videosExample.sort(() => 0.5 - Math.random());
        shuffled.slice(0, 5 - store.queue.length).map((song) =>
            store.queue.push(song)
        )
    }
}

function toggle(value) {
    if(value) {
        addRandomSongsToQueue()
    }
}

store.$subscribe((state, mutation) => {
    if (enabled.value) {
        addRandomSongsToQueue()
    }
})
</script>
<template>
    <SwitchGroup as="div" class="flex items-center justify-between">
        <span class="flex flex-grow flex-col">
            <SwitchLabel as="span" class="text-sm font-medium leading-6 text-white pr-3" passive>Auto-add songs
            </SwitchLabel>
        </span>
        <Switch v-model="enabled"
        @update:model-value="toggle"
            :class="[enabled ? 'bg-indigo-600' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2']">
            <span aria-hidden="true"
                :class="[enabled ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']" />
        </Switch>
    </SwitchGroup>
    </template>