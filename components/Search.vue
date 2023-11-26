
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import videosExample from '../utils/videos'
var ROOT_URL = 'https://www.googleapis.com/youtube/v3/search';

const store = useStore()
const videos = ref([]);
const config = useRuntimeConfig()

const videoSearch = async (searchTerm) => {
  var params = {
    part: 'snippet',
    key: config.public.youtubeapi2,
    q: searchTerm,
    type: 'video',
    maxResults: 10
  };

  axios.get(ROOT_URL, { params: params })
    .then(function (response) {
      videos.value = response.data.items;
    })
    .catch(function (error) {
      console.error(error);
    });
};

function addToQueue(video) {
  store.queue.push(video)
}

onMounted(() => {
  videoSearch('shaun paul');
});

</script>

<template>
  <div>
    <SearchInput class="" @termChange="videoSearch($event)" />
    <section class="h-[45vh]">
      <div class="p-4 grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xxl:grid-cols-5 gap-5">
        <div v-for="video in videos" :key="video.etag" class="relative">
          <img class="rounded-lg w-full" :src="video.snippet.thumbnails.medium.url" alt="">
          <div
            class="absolute top-0 left-0 w-full h-full bg-gray-800 bg-opacity-80 opacity-0 hover:opacity-100 flex flex-col justify-center items-center p-5" @click="addToQueue(video)">
            <div class="flex gap-1 mb-2.5 text-xs">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add to queue
            </div>
            <span class="text-sm font-semibold text-white">{{ video.snippet.title }}</span>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<style lang="scss" scoped></style>