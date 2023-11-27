<script setup>
useHead({
    title: "DJ Umbish"
})
</script>

<template>
    <div>
        <div class="fixed-background"></div>
        <Welcome />
        <div class="h-[40vh]">
            <Player />
        </div>
        <div class="lg:h-[5vh]">
            <div class="relative">
                <div class="absolute inset-0 flex items-center" aria-hidden="true">
                    <div class="w-full border-t border-gray-500"></div>
                </div>
                <div class="relative flex justify-center hidden lg:block">
                    <span class="bg-slate-900 px-3 text-base font-semibold leading-6 text-white">Search</span>
                </div>
            </div>
        </div>
        <div class="max-h-[55vh] overflow-auto">
            <Search />
        </div>
    </div>
</template>
<style>
body {
    font-family: 'Inter', sans-serif;
    margin: 0;
    color: white;
}

.fixed-background {
    opacity: 0;
    filter: brightness(0.3);
    height: 0;
    width: 0;
    background-image: url('/me.webp');
    background-position: center;
    background-repeat: no-repeat;
    position: absolute;
    z-index: 100;
    top: 0;
    background-size: cover;
    animation-name: loading;
    animation-duration: 1.5s;
}

@keyframes loading {
    0% {
        opacity: 1;
        height: 100vh;
        width: 100vw;
    }

    70% {
        opacity: 1;
    }

    99% {
        opacity: 0;
        height: 100vh;
        width: 100vw;
    }

    100% {
        height: 0;
        width: 0;
    }
}

/* Styles the scrollbar track (background) */
::-webkit-scrollbar {
    width: 12px;
    /* width of the entire scrollbar */
    background-color: #2e2e2e;
    /* color of the track */
    border-radius: 6px;
}

/* Styles the scrollbar thumb (the draggable part) */
::-webkit-scrollbar-thumb {
    background-color: #858585;
    /* color of the scrollbar thumb */
    border-radius: 6px;
    /* roundness of the scrollbar thumb */
    border: 3px solid #2e2e2e;
    /* creates padding around the scrollbar thumb */
}

/* Styles for when the scrollbar thumb is hovered */
::-webkit-scrollbar-thumb:hover {
    background-color: #666;
}

/* Firefox scrollbar styles */
* {
    scrollbar-width: thin;
    scrollbar-color: #555 #2e2e2e;
    /* thumb and track color */
}
</style>