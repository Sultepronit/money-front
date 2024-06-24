<script setup>
import ViraInput from '@/components/ViraInput.vue';
import MainInput from '@/modes/MainInput/MainInput.vue';
import MainStats from '@/components/MainStats.vue';
import CompactStats from '@/components/CompactStats.vue';
import MainChart from '@/components/MainChart.vue';
import ManyStats from '@/components/ManyStats.vue';
import FlexibleViewInput from '@/components/FlexibleViewInput.vue';

import { ref } from 'vue';

const mode = ref('flex');

</script>

<template>
   <p class="buttons">
        <button @click="mode='flex'">flex</button>
        <button @click="mode='input'">input</button>
        <button @click="mode='stats'">stats</button>
        <button @click="mode='chart'">chart</button>
        <button @click="mode='vira'">vira</button>
        <button @click="mode='compact'">compact</button>
        <button @click="mode='beauty'">beauty</button>
    </p>

    <FlexibleViewInput v-show="mode === 'flex'" />
    <MainInput v-show="mode === 'input'" />
    <MainChart v-show="mode === 'chart'" />
    <MainStats v-show="mode === 'stats'" />
    <ViraInput v-show="mode === 'vira'" />
    <CompactStats v-show="mode === 'compact'" />
    <ManyStats v-show="mode === 'beauty'" />
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