<script setup>
import StatusBar from '@/components/StatusBar.vue';
import SecureScreen from '@/components/SecureScreen.vue';
import MainView from '@/components/MainView.vue';
import ViraView from '@/components/ViraView.vue';

import { ref, computed } from 'vue';

import { loggedIn } from './utils/security';

const currentPath = ref(window.location.hash);
window.addEventListener('hashchange', () => currentPath.value = window.location.hash);

const routes = {
    '#/main': MainView
};

const mode = computed(() => routes[currentPath.value] || ViraView);

</script>

<template>
    <StatusBar />
    <SecureScreen v-if="!loggedIn"/>
    <component
        v-if="loggedIn"
        :is="mode"
    /> 
</template>