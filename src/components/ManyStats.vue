<script setup>
import IncomeExpenseChart from './IncomeExpenseChart.vue';
import BalanceChart from './BalanceChart.vue';
import FutureChart from '@/components/FutureChart.vue';

import { data } from '@/services/data.js';
import { prepareMonths } from '@/utils/incomeExpenseHandlers.js';

const allMonths = prepareMonths();
console.log(allMonths);
</script>

<template>
<section>
    <IncomeExpenseChart :data="data" />
    <hr>
    <IncomeExpenseChart :data="allMonths" unit="month" />
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