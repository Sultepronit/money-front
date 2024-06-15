<script setup>
import { Bar } from 'vue-chartjs';
import { Chart, LinearScale, Title, Tooltip, Legend, BarElement, CategoryScale, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';

const props = defineProps(['data']);

// import { chartData } from '@/utils/mainChartData.js';
console.log(props.data);
console.log(props.data.datasets[0].data[0].x);

Chart.register(LinearScale, Title, Tooltip, Legend, BarElement, CategoryScale, TimeScale);

// Chart.defaults.borderColor = 'black';
// console.log(Chart.defaults);

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    categoryPercentage: 0.8,
    barPercentage: 0.99,
    plugins: {
        legend: {
            display: false
        },
        // tooltip: {
        //     callbacks: {
        //         title: function(items) {
        //             const date = new Date(items[0].raw[0]);
        //             return date.toDateString();
        //         }
        //     }
        // }
    },
    scales: {
        x: {
            type: 'time',
            time: {
                // unit: 'month',
                // nuit: 'week'
                unit: 'day'
            },
            grid: {
                display: false
            },
            // stacked: true
            // beginAtZero: true,
            // min: props.data.datasets[0].data[0].x
            // min: '2024-06-05',
        },
        y: {
            // stacked: true
            // position: 'right',
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
<section class="container">
    <Bar
        :options="chartOptions"
        :data="data"
    />
</section>
</template>

<style scoped>
.container {
    width: 100%;
    /* height: 95dvh; */
    min-height: 500px;
}
</style>