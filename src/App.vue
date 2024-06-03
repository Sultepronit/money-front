<script setup>
import ViraInput from '@/mods/ViraInput/ViraInput.vue';
import SecureScreen from '@/mods/SecureScreen/SecureScreen.vue';

// import { ref } from 'vue';
import { loggedIn } from './utils/security';
import { prepareData, ready } from '@/services/data.js';

// const loggedIn = ref(false);

prepareData();
</script>

<template>
    <SecureScreen v-if="!loggedIn"/>
    <ViraInput v-if="loggedIn" />
</template>