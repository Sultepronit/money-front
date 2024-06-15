<script setup>
import IncomeExpenseChart from './IncomeExpenseChart.vue';

import { ref, computed } from 'vue';
import { data } from '@/services/data.js';

function periodIncomeExpenses(data) {
    // data.reduce();
    const result = {
        totalIncome: 0,
        totalExpense: 0
    };

    for(const row of data.value) {
        result.totalIncome += row.income;
        result.totalExpense += row.expense;
    }

    result.meanIncome = Math.round(result.totalIncome / data.value.length);
    result.meanExpense = Math.round(result.totalExpense / data.value.length);

    return result;
}

const myIncExp = computed(() => periodIncomeExpenses(data));

class dataSet {
    constructor(name, background, color, borderWidth, data, category, reverse) {
        this.label = name;
        // this.fill = !!background;
        this.backgroundColor = background || 'white';
        this.borderColor = color;
        // this.borderWidth = borderWidth;
        // this.barThickness = 10;
        // this.pointRadius = 0;
        this.data = data.value.map(entry => {
            return {
                x: entry.date,
                y: reverse ? reverse * entry[category] : entry[category]
            }
        });
    }
};

const chartData = computed(() => {
    return {
        datasets: [
            new dataSet(`${myIncExp.value.totalIncome}`, 'green', 'blue', 3, data, 'income'),
            new dataSet('expense', 'red', 'blue', 3, data, 'expense', -1),
        ]
    }
});
</script>

<template>
<section>
    <pre>{{ myIncExp }}</pre>
    <IncomeExpenseChart :data="chartData" />
</section>
</template>