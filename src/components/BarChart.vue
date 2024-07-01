<script setup>
import { Bar } from 'vue-chartjs';
import { Chart, LinearScale, Title, Tooltip, Legend, BarElement, CategoryScale, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { ref, computed, onMounted, onUpdated } from 'vue';

// const props = defineProps(['data', 'unit']);
const props = defineProps({
    data: {
        type: Object
    },
    unit: {
        type: String,
        // default: 'day'
    }
});

Chart.register(LinearScale, Title, Tooltip, Legend, BarElement, CategoryScale, TimeScale);

// Chart.defaults.borderColor = 'black';
// console.log(Chart.defaults);

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    // categoryPercentage: 0.5,
    // barPercentage: 1,
    plugins: {
        legend: {
            // display: false
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
                // unit: 'day'
                unit: props.unit,
                tooltipFormat: 'PP', // without time
            },
            // grid: {
            //     display: false
            // },
            stacked: true,
            ticks: {
                major: {
                    enabled: true
                }
            },
            grid: {
                color: function(context) {
                    return context.tick && context.tick.major
                        ? 'black' : 'white';
                }
            },
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

const minWidth = computed(() => {    
    return { 'min-width': props.data.datasets[0].data.length * 25 + 'px' };
});

const inner = ref(null);
function toTheRight() {
    inner.value.scroll({ left: 10000 });
}

onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting) {
            toTheRight();
            observer.disconnect();
        }
    });
    observer.observe(inner.value);
});
</script>

<template>
<section class="outer-container" ref="inner">
    <div class="inner-container" :style="minWidth" >
        <Bar
            :options="chartOptions"
            :data="data"
        />
    </div>
</section>
</template>

<style scoped>
.container {
    width: 100%;
    /* height: 95dvh; */
    height: 500px;
    max-height: 95dvh;
}

.outer-container {
    overflow-x: auto;
}
.inner-container {
    /* width: 1000px; */
    width: 100%;
    height: 500px;
    max-height: 95dvh;
}
</style>