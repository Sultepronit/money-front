<script setup>
import { ref, onMounted } from 'vue';
import { Line } from 'vue-chartjs';
import { Chart, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, BarElement, CategoryScale, Filler, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { computed } from 'vue';
// import annotationPlugin from 'chartjs-plugin-annotation';

// const props = defineProps(['data', 'displayLegend']);
const props = defineProps({
    data: {
        type: Object
    },
    displayLegend: {
        type: Boolean
    },
    widthFactor: {
        type: Number,
        default: 1
    }
});
// console.log(props);

Chart.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, BarElement, CategoryScale, Filler, TimeScale, /*annotationPlugin*/);

Chart.defaults.borderColor = 'black';
// console.log(Chart.defaults);

// const major = 10000;
// const minor = 2000;

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    // height: 1600,
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

const dataLine = props.data.datasets[0].data;
const range = new Date(dataLine[dataLine.length - 1][0]) - new Date(dataLine[0][0]);
console.log(range / 10_000_000);

const minWidth = computed(() => {
    return { 'min-width': (range / 10_000_000 * props.widthFactor) + 'px' };
});

</script>

<template>
<section class="outer-container" ref="outer">
    <div class="inner-container" :style="minWidth" >
        <Line
            :options="chartOptions"
            :data="data"
        />
    </div>
</section>
<!-- <Line
    :options="chartOptions"
    :data="data"
/> -->
</template>

<style scoped>
.outer-container {
    overflow-x: auto;
}

.inner-container {
    width: 100%;
    height: 500px;
    /* max-height: 95dvh; */
    /* height: 95dvh; */
}
.container {
    /* width: 90%; */
    height: 95dvh;
}
</style>