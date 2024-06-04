<script setup>
import { computed } from 'vue';

import { Line } from 'vue-chartjs';
import { Chart, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, BarElement, CategoryScale, Filler, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';
// import annotationPlugin from 'chartjs-plugin-annotation';

import { data } from '@/services/data.js';

Chart.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, BarElement, CategoryScale, Filler, TimeScale, /*annotationPlugin*/);

Chart.defaults.borderColor = 'black';
console.log(Chart.defaults);

const chartOptions = {
    responsive: true,
    // scales: {
    //     x: {
    //         type: 'time',
    //         time: {
    //             unit: 'month'
    //         }
    //     }
    // }
};

const chartData = computed(() => {
    return {
        datasets: [
            {
                label: 'vira',
                backgroundColor: 'white',
                borderColor: 'blue',
                pointRadius: 0,
                tension: 0.1,
                data: data.value.map(entry => [entry.date, entry.vira.black.balance])
                // data: [['2021-11-06', 1], ['2021-11-07'], 2]
            }
        ]
    };
});
</script>

<template>
    <!-- <Line
        :options="chartOptions",
        :data="chartData"
    /> -->
    <pre>{{ data[1] }}</pre>

</template>