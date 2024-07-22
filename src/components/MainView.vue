<script setup>
import ViraInput from '@/components/ViraInput.vue';
import CompactStats from '@/components/CompactStats.vue';
// import MainChart from '@/components/MainChart.vue';
import ManyStats from '@/components/ManyStats.vue';
import FlexibleViewInput from '@/components/FlexibleViewInput.vue';
import MainCharts from '@/components/MainCharts.vue';

import { ref } from 'vue';

const mode = ref('flex');

</script>

<template>
   <header class="buttons">
        <button @click="mode='flex'">flex</button>
        <button @click="mode='charts'">charts</button>
        <button @click="mode='vira'">vira</button>
        <button @click="mode='compact'">compact</button>
        <button @click="mode='beauty'">beauty</button>
        <!-- <button @click="mode='chart'">chart</button> -->
    </header>

    <main>
        <FlexibleViewInput v-show="mode === 'flex'" />
        <MainCharts v-show="mode === 'charts'" />
        <!-- <MainChart v-show="mode === 'chart'" /> -->
        <ViraInput v-show="mode === 'vira'" />
        <CompactStats v-show="mode === 'compact'" />
        <ManyStats v-show="mode === 'beauty'" />
    </main>
</template>

<style scoped>
.buttons {
    /* margin-bottom: 0.2em; */
    width: 100%;
    height: 2.2rem;
    text-wrap: nowrap;
    overflow: auto;
}
button {
    margin-inline: 0.5em;
    padding-inline: 0.5em;
}
main {
    overflow: auto;
    height: calc(100dvh - 2.5rem);
}
</style>