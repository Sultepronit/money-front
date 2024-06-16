<script setup>
import LineChart from './LineChart.vue';

import { computed } from 'vue';
import { data } from '@/services/data.js';
import Graph from '@/utils/MainGraph.js';

const chartData = computed(() => {
    return {
        datasets: [
            new Graph('Веронічка', null, 'blue', 4, data, ['vira', 'balance']),
            new Graph('готівка', null, 'rgba(0, 0, 0, 0.4)', 5, data, ['common', 'cash', 'balance']),
            new Graph('usd', null, 'rgba(0, 128, 0, 0.7)', 5, data, ['common', 'usd', 'uah']),
            new Graph('батько', null, 'green', 4, data, ['stefko', 'balance']),
            new Graph('баланс', 'rgba(0, 255, 0, 0.3)', 'green', 2, data, ['balance']),
        ]
    }
});

</script>

<template>
<section class="container">
    <LineChart
        :data="chartData"
        displayLegend="true"
    />
</section>
</template>

<style scoped>
.container {
    width: 100%;
    /* height: 95dvh; */
    height: 500px;
    max-height: 95dvh;
}
</style>