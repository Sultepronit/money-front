<script setup>
import LineChart from './LineChart.vue';

import { computed } from 'vue';
import { LineSet } from '@/utils/chartDataSets.js';
import timeline from '@/utils/timeline.js';

const props = defineProps(['details']);

const chartData = computed(() => {
    let datasets = [
        new LineSet('balance', 'rgba(0, 0, 0, 0.2)', 'black', 1, timeline, ['balance']),
        new LineSet('debit', 'rgba(0, 255, 0, 0.3)', 'green', 2, timeline, ['debit']),
        new LineSet('credit', 'rgba(255, 0, 0, 0.15)', 'red', 2, timeline, ['credit']),
    ];

    if(props.details) {
        datasets = [
            datasets[0],
            new LineSet('pumb', null, '#ff28a1', 3, timeline, ['credit1']),
            new LineSet('mono', null, '#ff5500', 3, timeline, ['credit2']),
            new LineSet('privat', null, 'yellow', 3, timeline, ['credit3']),
            new LineSet('more', null, 'red', 3, timeline, ['credit4']),
            new LineSet('wait', null, 'black', 3, timeline, ['wait']),
            datasets[1],
            datasets[2],
        ];
    }
    
    // console.log(datasets);

    return { datasets };
});
// console.log(chartData);
// console.log(chartData.value);
</script>

<template>
<section class="chart">
    <LineChart
        :data="chartData"
        :displayLegend="false"
        :widthConstraint="820"
        height="95dvh"
    />
</section>
</template>

<style scoped>

</style>