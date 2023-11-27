<template>
    <ClientOnly>
        <TransitionRoot as="div" :show="open">
            <Dialog as="section" class="relative z-10" @close="setCookieOnModalClose">
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
                                <div>
                                    <div class="text-indigo-600 text-center text-2xl font-bold tracking-tight flex justify-center items-center gap-3 italic">
                                        <MusicalNoteIcon class="w-6 h-6 text-indigo-600"/>
                                        DJ Umbish
                                        <MusicalNoteIcon class="w-6 h-6"/>
                                    </div>
                                    <div class="mt-3 text-center sm:mt-5">
                                        <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900 mb-0">Why was
                                            this created?</DialogTitle>
                                        <div class="">
                                            <p class="text-sm text-gray-800 ">No DJ = No Party<br>
                                                I wanted to carry a personal DJ.
                                                <br> Dance <b>non-stop</b>!
                                            </p>
                                        </div>
                                        <DialogTitle as="h3" class="mt-4 text-base font-semibold leading-6 text-gray-900">
                                            What
                                            is this?</DialogTitle>
                                        <div class="mt-2">
                                            <p class="text-sm text-gray-800">This player will automix your songs so the
                                                party
                                                never stops.</p>
                                        </div>
                                        <DialogTitle as="h3" class="mt-4 text-base font-semibold leading-6 text-gray-900">
                                            How it
                                            works?</DialogTitle>
                                        <div class="mt-2">
                                            <ol class="text-sm text-gray-800">
                                                <li>1. Select music from the search section</li>
                                                <li>2. Go dance</li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-5 sm:mt-6 sm:gap-3">
                                    <button type="button"
                                        class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                                        @click="setCookieOnModalClose">Okay</button>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>
    </ClientOnly>
</template>
  
<script setup>
import { ref } from 'vue'
const open = ref(true)
import { onMounted } from 'vue';
import Cookies from 'js-cookie'; // Assuming you are using js-cookie
import {
    MusicalNoteIcon
} from '@heroicons/vue/24/outline'
// This ref will hold the boolean value of cookie's existence
const isCookieSet = ref(false);

// Function to check if the cookie is set
function checkWelcomeMessageCookie() {
    const cookieValue = Cookies.get('welcome-message');
    if (cookieValue) {
        open.value = false
    }
}

function setCookieOnModalClose() {
    open.value = false
    Cookies.set('welcome-message', 'true', { expires: 365 }); // Set cookie for 7 days
}


// Execute the function on component mount
onMounted(() => {
    checkWelcomeMessageCookie();
});
</script>