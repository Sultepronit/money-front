<script setup>
import LineChart from './LineChart.vue';

import { computed } from 'vue';
import { wholeData as data } from '@/services/data.js';
import { LineSet } from '@/utils/chartDataSets.js';

const chartData = computed(() => {
    return {
        datasets: [
            new LineSet('balance', 'rgba(0, 0, 0, 0.2)', 'black', 1, data, ['stefko', 'balance']),
            new LineSet('pumb', null, '#ff28a1', 3, data, ['stefko', 'credit', 'account1', 'balance']),
            new LineSet('mono', null, '#ff5500', 3, data, ['stefko', 'credit', 'account2', 'balance']),
            new LineSet('privat', null, 'yellow', 3, data, ['stefko', 'credit', 'account3', 'balance']),
            new LineSet('more', null, 'red', 3, data, ['stefko', 'credit', 'account4', 'balance']),
            new LineSet('wait', null, 'black', 3, data, ['stefko', 'debitAccounts', 'account4', 'balance']),
            new LineSet('ready', null, 'green', 2, data, ['stefko', 'debitReady']),
            new LineSet('credit', 'rgba(255, 0, 0, 0.15)', 'red', 2, data, ['stefko', 'credit', 'sum']),
            new LineSet('debit', 'rgba(0, 255, 0, 0.3)', 'green', 2, data, ['stefko', 'debit']),
        ]
    }
});

</script>

<template>
    <LineChart
        :data="chartData"
        height="95dvh"
    />
</template>

<style scoped>

</style>