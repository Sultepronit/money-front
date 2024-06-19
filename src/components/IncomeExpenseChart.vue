<script setup>
import BarChart from './BarChart.vue';
import BigNumber from './BigNumber.vue';

import { computed } from 'vue';
import { BarSet } from '@/utils/chartDataSets.js';
// import { data } from '@/services/data.js';
import { ukrainianDate, monthYear } from '@/utils/formatters';

// const props = defineProps(['data']);
const props = defineProps({
    data: {
        type: Object
    },
    unit: {
        type: String,
        default: 'day'
    }
});

function getTotals(data) {
    const result = {
        totalIncome: 0,
        totalExpense: 0
    };

    // console.log(data);
    for(const row of data) {
        result.totalIncome += row.income;
        result.totalExpense += row.expense;
    }

    result.meanIncome = Math.round(result.totalIncome / data.length);
    result.meanExpense = Math.round(result.totalExpense / data.length);
    result.totalChange = result.totalIncome + result.totalExpense;
    result.meanChange = result.meanIncome + result.meanExpense;

    return result;
}

const totals = computed(() => getTotals(props.data));
const plusOrMinus = computed(() =>
    totals.value.totalChange > 0 ? { class: 'income', sign: '+' } 
        : totals.value.totalChange < 0 ? { class: 'expense', sign: '' } : null
);

const chartData = computed(() => {
    return {
        datasets: [
            new BarSet('розходи', 'rgba(255, 0, 0, 0.5)', 'blue', 0, props.data, 'expense', -1),
            new BarSet('доходи', 'rgba(0, 128, 0, 0.8)', 'blue', 0, props.data, 'income'),
        ]
    }
});

const fromDate = new Date(props.data[0].date);
const toDate = new Date(props.data[props.data.length - 1].date);
// const range = toDate - fromDate;
const days = (toDate - fromDate) < 10_000_000_000;

const fromDateFormatted = days ? ukrainianDate(fromDate, true) : monthYear(fromDate);
const toDateFormatted = days ? ukrainianDate(toDate, true) : monthYear(toDate);

</script>

<template>
<section>
    <p class="center"><b>{{ fromDateFormatted }} - {{ toDateFormatted }}</b></p>
    <table class="margin-auto">
        <tbody>
            <tr class="income">
                <td>доходи:</td>
                <td><div class=flex>+<BigNumber :value="totals.meanIncome" /></div></td>
                <td><div class=flex>+<BigNumber :value="totals.totalIncome" /></div></td>
            </tr>
            <tr class="expense">
                <td>розходи:</td>
                <td><BigNumber :value="totals.meanExpense" /></td>
                <td><BigNumber :value="totals.totalExpense" /></td>
            </tr>
            <tr :class="plusOrMinus?.class">
                <td>баланс:</td>
                <td>
                    <div class=flex>
                        {{ plusOrMinus?.sign }}
                        <BigNumber :value="totals.meanChange" />
                    </div>
                </td>
                <td>
                    <div class=flex>
                        {{ plusOrMinus?.sign }}
                        <BigNumber :value="totals.totalChange" />
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <BarChart :data="chartData" :unit="unit" />
</section>
</template>

<style scoped>
.margin-auto {
    margin: auto;
}
</style>