import { ref, computed } from 'vue';
import { getRate } from './api.js';
import { DataRow } from '@/utils/dataStructures.js';

// let rawData = [];
// const wholeData = ref([]);
// const data = computed(() => wholeData.value.slice(3));
// const reversed = computed(() => data.value.slice().reverse());

const rawData = ref([]);

function parseData(data) {
    const result = [];
    let previousRow = null;
    for(const row of data) {
        const parsedRow = new DataRow(row, previousRow);

        result.push(parsedRow);
        previousRow = parsedRow;
    };

    console.log(result);

    return result;
}

const wholeData = computed(() => parseData(rawData.value));
const data = computed(() => wholeData.value.slice(3));
const reversed = computed(() => data.value.slice().reverse());

async function handleRate() {
    if(reversed.value[0].common.usd.rate.current === null) {
        const newRate = await getRate();
        reversed.value[0].common.usd.rate.updateValue(newRate.rate);
    }
}

function prepareData(inputRawData) {
    console.log(inputRawData);
    localStorage.setItem('rawData', JSON.stringify(inputRawData));
    rawData.value = inputRawData;

    // wholeData.value = parseData(rawData);
    // console.log(data.value);

    handleRate();
}

export { prepareData, rawData, wholeData, data, reversed };