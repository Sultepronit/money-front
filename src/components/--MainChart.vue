<script setup>
import FutureChart from '@/components/FutureChart.vue';

import { Line } from 'vue-chartjs';
import { Chart, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, BarElement, CategoryScale, Filler, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';
// import annotationPlugin from 'chartjs-plugin-annotation';

import { chartData } from '@/utils/mainChartData.js';
// console.log(chartData);

Chart.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, BarElement, CategoryScale, Filler, TimeScale, /*annotationPlugin*/);

Chart.defaults.borderColor = 'black';
// console.log(Chart.defaults);

const major = 10000;
const minor = 2000;

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
            // ticks: {
            //     stepSize: minor,
            //     callback: function(val) {
            //         return val % major === 0 ? this.getLabelForValue(val) : '';
            //     }
            // },
            // grid: {
            //     color: function(context) {
            //         return context.tick && context.tick.value % major === 0 ? 'black' : 'lightgray';
            //     }
            // }
        },
    }
};

</script>

<template>
<section>
    <section class="container">
        <Line
            :options="chartOptions"
            :data="chartData"
        />
    </section>
    <hr>
    <FutureChart :details="true"  />
</section>
</template>

<style scoped>
.container {
    width: 100%;
    height: 95dvh;
}
</style>