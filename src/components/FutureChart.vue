<script setup>
import LineChart from './LineChart.vue';

import { computed } from 'vue';
import { wholeData as pastData } from '@/services/data.js';
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

const timeline = {
    entries: computed(() =>
        pastData.value.map(entry => new TimeEntry(
            entry.date,
            entry.stefko.debit,
            entry.stefko.credit.account1.balance,
            entry.stefko.credit.account2.balance,
            entry.stefko.credit.account3.balance,
            entry.stefko.credit.account4.balance
        ))
    ),

    append(date, change) {
        const lastDay = this.entries.value[this.entries.value.length - 1];
        const lastDate = new Date(lastDay.date);

        if(change) {
            const nextDate = new Date(date);
            if(nextDate.getDate() - lastDate.getDate() > 1) {
                const previousDay = new Date(nextDate - (24 * 60 * 60 * 1000));
                this.append(previousDay);
            }
        } else {
            change = [0, 0, 0, 0];
        }
        
        this.entries.value.push(
            new TimeEntry(
                date || new Date(lastDate.getFullYear(), lastDate.getMonth() + 1, 1), // next month's 1st
                lastDay.debit - change.reduce((acc, val) => acc + val),
                lastDay.credit1 + change[0],
                lastDay.credit2 + change[1],
                lastDay.credit3 + change[2],
                lastDay.credit4 + change[3],
            )
        );
    }
}
timeline.append('2024-06-20', [0, 0, 0, 2366]);
timeline.append('2024-06-24', [0, 0, 9386, 0]);
timeline.append('2024-06-29', [401, 884, 0, 0]);
// timeline.append('2024-06-30', [0, 0, 0, 2000]);
timeline.append();
// timeline.append('2024-07-21', [2000, 0, 0, 0]);
// timeline.append();

const chartData = computed(() => {
    return {
        datasets: [
            new LineSet('pumb', null, '#ff28a1', 3, timeline.entries, ['credit1']),
            new LineSet('mono', null, '#ff5500', 3, timeline.entries, ['credit2']),
            new LineSet('privat', null, 'yellow', 3, timeline.entries, ['credit3']),
            new LineSet('more', null, 'red', 3, timeline.entries, ['credit4']),
            new LineSet('debit', 'rgba(0, 255, 0, 0.2)', 'green', 2, timeline.entries, ['debit']),
            new LineSet('credit', 'rgba(255, 0, 0, 0.15)', 'red', 2, timeline.entries, ['credit']),
            new LineSet('balance', 'rgba(0, 0, 0, 0.2)', 'black', 1, timeline.entries, ['balance']),
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