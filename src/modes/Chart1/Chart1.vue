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
                stepSize: 500,
                callback: function(val) {
                    return val % 2000 === 0 ? this.getLabelForValue(val) : '';
                }
            },
            grid: {
                color: function(context) {
                    return context.tick && context.tick.value % 2000 === 0 ? 'black' : 'lightgray';
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
                tension: 0.1,
                data: data.value.map(entry => [
                    entry.date,
                    entry.vira.black.balance + entry.vira.white.balance
                ])
            }
        ]
    }
});

</script>

<template>
    <div class="container">
        <Line
            :options="chartOptions"
            :data="chartData"
        />
    </div>
    <!-- <pre>{{ data[1] }}</pre> -->
</template>

<style scoped>
.container {
    width: 90%;
    height: 90vh;
}
</style>