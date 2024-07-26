<script setup>
import IncomeExpenseChart from './IncomeExpenseChart.vue';
import BalanceChart from './BalanceChart.vue';
import FutureChart from '@/components/FutureChart.vue';

import { computed } from 'vue';
import { reversed } from '@/services/data.js';
import { prepareMonths } from '@/utils/incomeExpenseHandlers.js';

const lastMonth = computed(() => {
    const today = (new Date()).getDate();
    let counter = 0;
    const result = [];
    for(const day of reversed.value) {
        result.push(day);
        if((new Date(day.date)).getDate() === today) {
            counter++; 
            if(counter > 1) break; // 1 - today, 2 - month ago
        }
    }
    return result.reverse();
});

const allMonths = computed(() => prepareMonths(reversed.value));
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