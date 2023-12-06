<template>
  <header>
    <div class="lg:divide-y lg:divide-gray-700">
      <div class="relative flex h-16 ">
        <div class="relative z-0 flex flex-1 items-center justify-start px-4 sm:absolute sm:inset-0">
          <div class="w-full sm:max-w-xs">
            <label for="searchId" class="sr-only">Search</label>
            <div class="relative">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd"
                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                    clip-rule="evenodd" />
                </svg>
              </div>
              <input id="search" name="searchId" v-model="searchTerm"
                class="block w-full rounded-md border-0 bg-gray-700 py-1.5 pl-10 pr-3 text-gray-300 placeholder:text-gray-400 focus:text-white focus:ring-0 focus:placeholder:text-gray-500 sm:text-sm sm:leading-6"
                placeholder="Search" type="search">
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
  </header>
</template>
  
<script setup>
import { ref, watch } from 'vue';
import _ from 'lodash';
const emit = defineEmits(['termChange']);
const mixpanel = useMixpanel()

const searchTerm = ref('');
const debouncedSearch = _.debounce(() => {
  // Emit the encoded search term
  mixpanel.track('Search', {
    searchTerm: searchTerm.value
  })
  emit('termChange', encodeURIComponent(searchTerm.value));
}, 400);

watch(searchTerm, () => {
  debouncedSearch();
});
</script>
  
<style></style>🐑