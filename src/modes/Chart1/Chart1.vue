<script setup>
import { computed } from 'vue';

import { Line } from 'vue-chartjs';
import { Chart, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, BarElement, CategoryScale, Filler, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';
// import annotationPlugin from 'chartjs-plugin-annotation';

import Graph from './utils/Graph.js';
import { data } from '@/services/data.js';

Chart.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, BarElement, CategoryScale, Filler, TimeScale, /*annotationPlugin*/);

Chart.defaults.borderColor = 'black';
// console.log(Chart.defaults);

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
        node: 'nearest',
        intersect: false
    },
    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            callbacks: {
                title: function(items) {
                    const date = new Date(items[0].raw[0]);
                    return date.toDateString();
                }
            }
        }
    },
    scales: {
        x: {
            type: 'time',
            time: {
                unit: 'month',
            },
            min: '2024-06-01',
            // max: '2024-07-01'
        },
        y: {
            position: 'right',
            ticks: {
                stepSize: 1000,
                callback: function(val) {
                    return val % 5000 === 0 ? this.getLabelForValue(val) : '';
                }
            },
            grid: {
                color: function(context) {
                    return context.tick && context.tick.value % 5000 === 0 ? 'black' : 'lightgray';
                }
            }
        },
    }
};
const chartData = computed(() => {
    return {
        datasets: [
            {
                label: 'vira',
                backgroundColor: 'white',
                borderColor: 'blue',
                pointRadius: 0,
                // tension: 0.1,
                data: data.value.map(entry => [
                    entry.date,
                    entry.vira.balance
                ])
            },
            new Graph('usd', null, 'rgba(0, 0, 0, 0.4)', 5, data.value.map(entry => [
                entry.date,
                entry.common.cash.balance
            ])),
            new Graph('usd', null, 'rgba(0, 128, 0, 0.7)', 5, data.value.map(entry => [
                entry.date,
                entry.common.usd.uah
            ])),
            {
                label: 'balance',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                borderColor: 'white',
                borderWidth: 0,
                pointRadius: 0,
                // tension: 0.1,
                fill: true,
                data: data.value.map(entry => [
                    entry.date,
                    entry.balance
                ])
            },
            new Graph('pumb', null, '#ff28a1', 3, data.value.map(entry => [
                entry.date,
                entry.stefko.credit.account1.balance
            ])),
            new Graph('mono', null, '#ff5500', 3, data.value.map(entry => [
                entry.date,
                entry.stefko.credit.account2.balance
            ])),
            new Graph('privat', null, 'yellow', 3, data.value.map(entry => [
                entry.date,
                entry.stefko.credit.account3.balance
            ])),
            new Graph('more', null, 'red', 3, data.value.map(entry => [
                entry.date,
                entry.stefko.credit.account4.balance
            ])),
            new Graph('credit', 'rgba(255, 0, 0, 0.15)', 'red', 2, data.value.map(entry => [
                entry.date,
                entry.stefko.credit.sum
            ])),
            new Graph('debit', 'rgba(0, 255, 0, 0.2)', 'green', 2, data.value.map(entry => [
                entry.date,
                entry.debit
            ])),
            new Graph('pumb-deb', null, 'black', 4, data.value.map(entry => [
                entry.date,
                entry.stefko.debit.account1.balance
            ])),
            new Graph('zp', null, 'black', 2, data.value.map(entry => [
                entry.date,
                entry.stefko.debit.account2.balance
            ])),
            new Graph('ready', null, 'green', 2, data.value.map(entry => [
                entry.date,
                entry.stefko.debit.sum
            ])),
        ]
    }
});

// console.log(chartData.value);

</script>

<template>
<section class="container">
    <Line
        :options="chartOptions"
        :data="chartData"
    />
</section>
</template>

<style scoped>
.container {
    width: 100%;
    height: 95vh;
    /* border-right: 1px solid black; */
}
</style>