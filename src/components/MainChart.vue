<script setup>
import { Line } from 'vue-chartjs';
import { Chart, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, BarElement, CategoryScale, Filler, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';
// import annotationPlugin from 'chartjs-plugin-annotation';

import { chartData } from '@/utils/mainChartData.js';
// console.log(chartData);

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
            // min: '2024-06-01',
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
    height: 95dvh;
}
</style>