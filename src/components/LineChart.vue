<script setup>
import { ref, onMounted } from 'vue';
import { Line } from 'vue-chartjs';
import { Chart, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, BarElement, CategoryScale, Filler, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';
// import annotationPlugin from 'chartjs-plugin-annotation';

const props = defineProps({
    data: {
        type: Object
    },
    displayLegend: {
        type: Boolean
    },
    widthConstraint: {
        type: Number,
        // default: 0
    },
    height: {
        type: String,
        default: '500px'
    }
});
// console.log(props);

Chart.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, BarElement, CategoryScale, Filler, TimeScale, /*annotationPlugin*/);

Chart.defaults.borderColor = 'black';
// console.log(Chart.defaults);

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
            display: props.displayLegend,
            align: 'end',            
            labels: {
                boxWidth: 12,
            },
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
        }
    }
};

const dataLine = props.data.datasets[0].data;
const range = new Date(dataLine[dataLine.length - 1][0]) - new Date(dataLine[0][0]);

const minWidthConst = 820;

// const widthFactor = innerWidth < minWidthConst ? innerWidth / minWidthConst : 1;

const widthFactor = (props.widthConstraint && innerWidth < props.widthConstraint) ?
    (innerWidth / minWidthConst) : 1;

const width = { 'width': (range / 9_000_000 * widthFactor) + 'px' };
const height = { height: props.height };

const outer = ref(null);
onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting) {
            outer.value.scroll({ left: 10000 });
            observer.disconnect();
        }
    });
    observer.observe(outer.value);
});
</script>

<template>
<section class="outer-container" ref="outer">
    <div class="inner-container" :style="[width, height]" >
        <Line
            :options="chartOptions"
            :data="data"
        />
    </div>
</section>
</template>

<style scoped>
.outer-container {
    overflow-x: auto;
}

.inner-container {
    width: 100%;
}
</style>