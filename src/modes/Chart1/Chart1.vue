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
    scales: {
        x: {
            type: 'time',
            time: {
                unit: 'month',
            }
        },
        y: {
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
            {
                label: 'cash',
                backgroundColor: 'white',
                borderColor: 'rgba(0, 0, 0, 0.4)',
                borderWidth: 5,
                pointRadius: 0,
                // tension: 0.1,
                data: data.value.map(entry => [
                    entry.date,
                    entry.common.cash.balance
                ])
            },
            {
                label: 'usd',
                backgroundColor: 'white',
                borderColor: 'rgba(0, 128, 0, 0.7)',
                borderWidth: 5,
                pointRadius: 0,
                // tension: 0.1,
                data: data.value.map(entry => [
                    entry.date,
                    entry.common.usd.uah
                ])
            },
            {
                label: 'balance',
                backgroundColor: 'rgba(0, 0, 0, 0.15)',
                borderColor: 'green',
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
            new Graph('credit', 'rgba(255, 0, 0, 0.25)', 'red', 2, data.value.map(entry => [
                entry.date,
                entry.stefko.credit.sum
            ])),
        ]
    }
});

// console.log(chartData.value);

</script>

<template>
    <div class="container">
        <Line
            :options="chartOptions"
            :data="chartData"
        />
    </div>
</template>

<style scoped>
.container {
    width: 100%;
    height: 99vh;
    border-right: 1px solid black;
}
</style>