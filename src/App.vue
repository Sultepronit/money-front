<script setup>
import ViraInput from '@/mods/ViraInput/ViraInput.vue';
import SecureScreen from '@/mods/SecureScreen/SecureScreen.vue';

import { loggedIn } from './utils/security';
import { prepareData, } from '@/services/data.js';

// prepareData();
</script>

<template>
    <SecureScreen v-if="!loggedIn"/>
    <ViraInput v-if="loggedIn" />
</template>