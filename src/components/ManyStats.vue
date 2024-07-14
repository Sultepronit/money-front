<script setup>
import IncomeExpenseChart from './IncomeExpenseChart.vue';
import BalanceChart from './BalanceChart.vue';
import FutureChart from '@/components/FutureChart.vue';

import { data, reversed } from '@/services/data.js';
import { prepareMonths } from '@/utils/incomeExpenseHandlers.js';

const today = (new Date()).getDate();
let counter = 0;
const lastMonth = [];
for(const day of reversed.value) {
    lastMonth.push(day);
    if((new Date(day.date)).getDate() === today) {
        counter++; // first time today, second - month ago
        if(counter > 1) break;
    }
}
lastMonth.reverse();
// console.log(lastMonth);

const allMonths = prepareMonths();
// console.log(allMonths);
</script>

<template>
<section>
    <IncomeExpenseChart :data="lastMonth" />
    <hr>
    <IncomeExpenseChart :data="allMonths" unit="month" />
    <hr>
    <p class="center"><b>Баланси</b></p>
    <BalanceChart />
    <!-- <hr>
    <p class="center"><b>Зобов'язання</b></p>
    <FutureChart /> -->
</section>
</template>

<style scoped>
hr {
    margin: 1rem;
}
</style>