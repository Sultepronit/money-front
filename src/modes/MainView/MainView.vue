<script setup>
import ViraInput from '@/modes/ViraInput/ViraInput.vue';
import Chart1 from '@/modes/Chart1/Chart1.vue';
import MainInput from '@/modes/MainInput/MainInput.vue';
import ViewStats from '@/modes/ViewStats/ViewStats.vue';
import CompactStats from '@/components/CompactStats.vue';

import { ref } from 'vue';

const mode = ref('input');

</script>

<template>
   <p class="buttons">
        <button @click="mode='input'">input</button>
        <button @click="mode='stats'">stats</button>
        <button @click="mode='chart'">chart</button>
        <button @click="mode='vira'">vira</button>
        <button @click="mode='compact'">compact</button>
    </p>
    <MainInput v-show="mode === 'input'" />
    <Chart1 v-show="mode === 'chart'" />
    <ViewStats v-show="mode === 'stats'" />
    <ViraInput v-show="mode === 'vira'" />
    <CompactStats v-show="mode === 'compact'" />
</template>

<style scoped>
.buttons {
    margin-bottom: 0.2em;
}
button {
    margin-inline: 0.5em;
    padding-inline: 0.5em;
}
</style>