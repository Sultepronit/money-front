<script setup>
import LineChart from './LineChart.vue';

import { computed } from 'vue';
import { wholeData as data } from '@/services/data.js';
import { LineSet } from '@/utils/chartDataSets.js';

const chartData = computed(() => {
    return {
        datasets: [
            new LineSet('$    ', null, 'green', 3, data, ['common', 'rates', 'usd', 'balance']),
            new LineSet('€    ', null, 'blue', 3, data, ['common', 'rates', 'eur', 'balance']),
        ]
    }
});

</script>

<template>
    <LineChart
        :data="chartData"
        :displayLegend="true"
        height="95dvh"
        :widthConstraint="1020"
    />
</template>

<style scoped>

</style>