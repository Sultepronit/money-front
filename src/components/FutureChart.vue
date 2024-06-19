<script setup>
import LineChart from './LineChart.vue';
import BigNumber from './BigNumber.vue';

import { computed } from 'vue';
import { LineSet } from '@/utils/dataSets.js';
import timeline, { report } from '@/utils/timeline.js';
import { ukrainianDate } from '@/utils/formatters.js';

// console.log(timeline);
// console.log(timeline.value);

const chartData = computed(() => {
    return {
        datasets: [
            new LineSet('balance', 'rgba(0, 0, 0, 0.2)', 'black', 1, timeline, ['balance']),
            new LineSet('pumb', null, '#ff28a1', 3, timeline, ['credit1']),
            new LineSet('mono', null, '#ff5500', 3, timeline, ['credit2']),
            new LineSet('privat', null, 'yellow', 3, timeline, ['credit3']),
            new LineSet('more', null, 'red', 3, timeline, ['credit4']),
            new LineSet('debit', 'rgba(0, 255, 0, 0.3)', 'green', 2, timeline, ['debit']),
            new LineSet('credit', 'rgba(255, 0, 0, 0.15)', 'red', 2, timeline, ['credit']),
        ]
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

    <table>
        <tbody>
            <tr v-for="entry in report" :key="entry.date">
                <td>{{ ukrainianDate(entry.date) }}</td>
                <td class="income"><BigNumber :value="entry.debit" /></td>
                <td class="expense"><BigNumber :value="entry.credit" /></td>
            </tr>
        </tbody>
    </table>
</section>
</template>

<style scoped>
.chart {
    height: 500px;
}
</style>