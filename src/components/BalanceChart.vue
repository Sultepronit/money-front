<script setup>
import LineChart from './LineChart.vue';

import { computed } from 'vue';
import { data } from '@/services/data.js';
import { LineSet } from '@/utils/chartDataSets.js';

const chartData = computed(() => {
    return {
        datasets: [
            new LineSet('Веронічка', null, 'blue', 4, data, ['vira', 'balance']),
            new LineSet('готівка', null, 'rgba(0, 0, 0, 0.4)', 5, data, ['common', 'cash', 'balance']),
            new LineSet('батько', null, 'green', 4, data, ['stefko', 'balance']),
            new LineSet('баланс', 'rgba(0, 255, 0, 0.3)', 'green', 2, data, ['balance']),
            new LineSet('usd', null, 'rgba(0, 255, 0, 1)', 5, data, ['common', 'usd', 'uah']),
        ]
    }
});

</script>

<template>
<section class="container">
    <LineChart
        :data="chartData"
        :displayLegend="true"
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