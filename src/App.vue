<script setup>
import SecureScreen from '@/modes/SecureScreen/SecureScreen.vue';
// import ViraInput from '@/modes/ViraInput/ViraInput.vue';
import MainInput from '@/modes/MainInput/MainInput.vue';
import ViewStats from '@/modes/ViewStats/ViewStats.vue';
import MainView from '@/modes/MainView/MainView.vue';
import ViraView from '@/components/ViraView.vue';

import { ref, computed } from 'vue';

import { loggedIn } from './utils/security';

const currentPath = ref(window.location.hash);
window.addEventListener('hashchange', () => currentPath.value = window.location.hash);
console.log(currentPath);

const routes = {
    '#/input': MainInput,
    '#/stats': ViewStats,
    '#/main': MainView,
    '#/vira': ViraView
};

const mode = computed(() => routes[currentPath.value] || ViraView);

</script>

<template>
    <SecureScreen v-if="!loggedIn"/>
    <!-- <ViraInput v-if="loggedIn" /> -->
    <component
        v-if="loggedIn"
        :is="mode"
    /> 
</template>