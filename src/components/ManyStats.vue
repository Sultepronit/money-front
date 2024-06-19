<script setup>
import IncomeExpenseChart from './IncomeExpenseChart.vue';
import BalanceChart from './BalanceChart.vue';
import FutureChart from '@/components/FutureChart.vue';

import { data } from '@/services/data.js';

const pastMonths = [
    { date: '2024-01-01', income: 39400, expense: -37308 },
    { date: '2024-02-01', income: 27950, expense: -36289 },
    { date: '2024-03-01', income: 50560, expense: -36602 },
    { date: '2024-04-01', income: 36220, expense: -39916 },
    { date: '2024-05-01', income: 46140, expense: -45085 },
];
</script>

<template>
<section>
    <IncomeExpenseChart :data="data" />
    <hr>
    <IncomeExpenseChart :data="pastMonths" unit="month" />
    <hr>
    <p class="center"><b>Баланси</b></p>
    <BalanceChart />
    <hr>
    <p class="center"><b>Зобов'язання</b></p>
    <FutureChart />
</section>
</template>

<style scoped>
hr {
    margin: 1rem;
}
</style>