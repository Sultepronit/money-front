<script setup>
import IncomeExpenseChart from './IncomeExpenseChart.vue';
import BalanceChart from './BalanceChart.vue';
import FutureChart from '@/components/FutureChart.vue';
import BigNumber from './BigNumber.vue';

import { computed } from 'vue';
import { data } from '@/services/data.js';
import { ukrainianDate } from '@/utils/formatters';

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
    result.totalChange = result.totalIncome + result.totalExpense;
    // result.totalChange = 0;
    result.meanChange = result.meanIncome + result.meanExpense;

    return result;
}

const myIncExp = computed(() => periodIncomeExpenses(data));
const plusOrMinus = computed(() =>
    myIncExp.value.totalChange > 0 ? { class: 'income', sign: '+' } 
        : myIncExp.value.totalChange < 0 ? { class: 'expense', sign: '' } : null
);

const chartData = computed(() => {
    return {
        datasets: [
            new dataSet('розходи', 'rgba(255, 0, 0, 0.5)', 'blue', 0, data, 'expense', -1),
            new dataSet('доходи', 'rgba(0, 128, 0, 0.8)', 'blue', 0, data, 'income'),
        ]
    }
});


</script>

<template>
<section>
    <!-- <FutureChart /> -->
    <p><b>{{ ukrainianDate(data[0].date, true) }} - {{ ukrainianDate(data[data.length - 1].date, true) }}</b></p>
    <table>
        <tbody>
            <tr class="income">
                <td>доходи:</td>
                <td class="right">+{{ myIncExp.meanIncome }}</td>
                <td>
                    <div class=flex>+<BigNumber :value="myIncExp.totalIncome" /></div>
                </td>
            </tr>
            <tr class="expense">
                <td>розходи:</td>
                <td class="right">{{ myIncExp.meanExpense }}</td>
                <td><BigNumber :value="myIncExp.totalExpense" /></td>
            </tr>
            <tr :class="plusOrMinus?.class">
                <td>баланс:</td>
                <td class="right">{{ plusOrMinus?.sign }}{{ myIncExp.meanChange }}</td>
                <td>
                    <div class=flex>
                        {{ plusOrMinus?.sign }}
                        <BigNumber :value="myIncExp.totalChange" />
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <IncomeExpenseChart :data="chartData" />
    <hr>
    <BalanceChart />
    <hr>
    <FutureChart />
</section>
</template>

<style scoped>

</style>