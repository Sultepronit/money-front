<script setup>
import LineChart from './LineChart.vue';

import { computed } from 'vue';
import { wholeData as data } from '@/services/data.js';
import { LineSet } from '@/utils/dataSets.js';

class TimeEntry {
    constructor(date, debit, credit1, credit2, credit3, credit4) {
        this.date = date;
        this.debit = debit;
        this.credit1 = credit1;
        this.credit2 = credit2;
        this.credit3 = credit3;
        this.credit4 = credit4;
    }

    get credit() {
        return this.credit1 + this.credit2 + this.credit3 + this.credit4;
    }

    get balance() {
        return this.debit + this.credit;
    }
}

const pastTime = computed(() =>
    data.value.map(entry => new TimeEntry(
        entry.date,
        entry.stefko.debit,
        entry.stefko.credit.account1.balance,
        entry.stefko.credit.account2.balance,
        entry.stefko.credit.account3.balance,
        entry.stefko.credit.account4.balance
    ))
);

const lastDay = pastTime.value[pastTime.value.length - 1];
console.log(lastDay);
const lastDate = lastDay.date;
console.log(lastDate);
const date = new Date(lastDate);
console.log(date);

const chartData = computed(() => {
    return {
        datasets: [
            new LineSet('debit', null, 'green', 4, pastTime, ['debit']),
            new LineSet('credit', null, 'red', 4, pastTime, ['credit']),
            new LineSet('balance', null, 'black', 4, pastTime, ['balance']),
        ]
    }
});
console.log(chartData);
console.log(chartData.value);
</script>

<template>
<section>
    <section class="chart">
        <LineChart
            :data="chartData"
            :displayLegend="false"
        />
    </section>
    <!-- <pre>{{ pastTime }}</pre> -->
    <!-- <pre>{{ data[10].stefko.debitAccounts }}</pre>
    <pre>{{ data[10].stefko.debit }}</pre>
    <pre>{{ data[10].stefko.credit }}</pre> -->
</section>
</template>

<style scoped>
.chart {
    height: 500px;
}
</style>