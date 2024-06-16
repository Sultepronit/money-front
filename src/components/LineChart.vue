<script setup>
import { Line } from 'vue-chartjs';
import { Chart, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, BarElement, CategoryScale, Filler, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';
// import annotationPlugin from 'chartjs-plugin-annotation';

// import { chartData } from '@/utils/mainChartData.js';
// console.log(chartData);

const props = defineProps(['data', 'displayLegend']);
// console.log(props);

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
            display: props.displayLegend
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
            //     major: {
            //         enabled: true
            //     },
            //     minor: {
            //         enabled: true
            //     }
            // }
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
<!-- <section class="container">
    <Line
        :options="chartOptions"
        :data="data"
    />
</section> -->
<Line
    :options="chartOptions"
    :data="data"
/>
</template>

<style scoped>
/* .container {
    width: 100%;
    height: 95dvh;
} */
</style>