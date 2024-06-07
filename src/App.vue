<script setup>
import SecureScreen from '@/modes/SecureScreen/SecureScreen.vue';
import ViraInput from '@/modes/ViraInput/ViraInput.vue';
import Chart1 from '@/modes/Chart1/Chart1.vue';
import MainInput from '@/modes/MainInput/MainInput.vue';
import ViewStats from '@/modes/ViewStats/ViewStats.vue';

import { ref, computed } from 'vue';

import { loggedIn } from './utils/security';
import { prepareData, } from '@/services/data.js';

const currentPath = ref(window.location.hash);
window.addEventListener('hashchange', () => currentPath.value = window.location.hash);
console.log(currentPath);

const routes = {
    '#/chart1': Chart1,
    '#/input': MainInput,
    '#/stats': ViewStats
};

const mode = computed(() => routes[currentPath.value] || ViraInput);

</script>

<template>
    <SecureScreen v-if="!loggedIn"/>
    <!-- <ViraInput v-if="loggedIn" /> -->
    <component
        v-if="loggedIn"
        :is="mode"
    /> 
</template>