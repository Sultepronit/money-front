<script setup>
import LineChart from './LineChart.vue';
import BigNumber from './BigNumber.vue';

import { computed } from 'vue';
import { LineSet } from '@/utils/dataSets.js';
import timeline from '@/utils/timeline.js';
import { ukrainianDate } from '@/utils/formatters.js';

const props = defineProps(['details']);

// console.log(timeline);
// console.log(timeline.value);

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
            datasets[1],
            datasets[2],
        ];
    }
    
    return {
        datasets
        // datasets: [
        //     new LineSet('balance', 'rgba(0, 0, 0, 0.2)', 'black', 1, timeline, ['balance']),
        //     new LineSet('pumb', null, '#ff28a1', 3, timeline, ['credit1']),
        //     new LineSet('mono', null, '#ff5500', 3, timeline, ['credit2']),
        //     new LineSet('privat', null, 'yellow', 3, timeline, ['credit3']),
        //     new LineSet('more', null, 'red', 3, timeline, ['credit4']),
        //     new LineSet('debit', 'rgba(0, 255, 0, 0.3)', 'green', 2, timeline, ['debit']),
        //     new LineSet('credit', 'rgba(255, 0, 0, 0.15)', 'red', 2, timeline, ['credit']),
        // ]
    }
});
// console.log(chartData);
// console.log(chartData.value);
</script>

<template>
<section>
    <section class="chart">
        <LineChart
            :data="chartData"
            :displayLegend="false"
        />
    </section>
</section>
</template>

<style scoped>
.chart {
    height: 600px;
}
</style>