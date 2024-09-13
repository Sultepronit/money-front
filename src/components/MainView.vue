<script setup>
import ViraInput from '@/components/ViraInput.vue';
import CompactStats from '@/components/CompactStats.vue';
import ManyStats from '@/components/ManyStats.vue';
import FlexibleViewInput from '@/components/FlexibleViewInput.vue';
import MainCharts from '@/components/MainCharts.vue';

import { ref } from 'vue';

const mode = ref('tables');

</script>

<template>
<section class="main-view">
    <header class="buttons">
        <button
            @click="mode='tables'"
            :class="{selected: mode === 'tables'}"
        >
            tables
        </button>
        <button
            @click="mode='charts'"
            :class="{selected: mode === 'charts'}"
        >
            charts
        </button>
        <button
            @click="mode='vira'"
            :class="{selected: mode === 'vira'}"
        >
            vira
        </button>
        <button
            @click="mode='compact'"
            :class="{selected: mode === 'compact'}"
        >
            compact
        </button>
        <button
            @click="mode='beauty'"
            :class="{selected: mode === 'beauty'}"
        >
            beauty
        </button>
    </header>

    <main>
        <FlexibleViewInput v-show="mode === 'tables'" />
        <MainCharts v-show="mode === 'charts'" />
        <ViraInput v-show="mode === 'vira'" />
        <CompactStats v-show="mode === 'compact'" />
        <ManyStats v-show="mode === 'beauty'" />
    </main>
</section>
</template>

<style scoped>
.main-view {
    display: grid;
    height: calc(100vh - 0.25rem);
}
.buttons {
    /* margin-bottom: 0.2em; */
    width: 100%;
    height: 2.2rem;
    text-wrap: nowrap;
    overflow: auto;
}
button {
    font: inherit;
    margin-inline: 0.1em;
    padding-inline: 0.5em;
    /* width: 5em; */
    /* color: gray; */
    /* background-color: #5df56d; */
    background-color: #e3e3e3;
    /* border: 1px solid; */
    border: none;
    font-size: min(1.2rem, 5vw);
}
.selected {
    /* border-bottom: 1px solid; */
    /* font-weight: bold; */
    background-color: aqua;
}
main {
    overflow: auto;
    /*height: calc(100dvh - 2.5rem);*/
}
</style>