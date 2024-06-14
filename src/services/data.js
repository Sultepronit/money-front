import { ref, computed } from 'vue';
import { getRate } from './api.js';
import { DataRow } from '@/utils/dataStructures.js';

const data = ref([]);
let rawData = [];
const reversed = computed(() => data.value.slice(3).reverse());

function fillNull(data) {
    const fillable = [
        'vira_black',
        'vira_white',
    ];

    let previous = {};

    for(const row of data) {
        for(const column of fillable) {
            if(row[column] === null) {
                row[column] = previous[column];
            } 
        }

        previous = row;
    }
}

function parseData(data) {
    const result = [];
    let previousRow = null;
    for(const row of data) {
        const parsedRow = new DataRow(row, previousRow);

        result.push(parsedRow);
        previousRow = parsedRow;
    };

    return result;
}

async function handleRate() {
    if(reversed.value[0].common.usd.rate.current === null) {
        const newRate = await getRate();
        reversed.value[0].common.usd.rate.updateValue(newRate.rate);
        if(reversed.value[0].common.usd.change !== 0) {
            reversed.value[0].income.update([reversed.value[0].common.usd.change]);
        }
    }
}

async function prepareData(inputRawData) {
    console.log(inputRawData);
    localStorage.setItem('rawData', JSON.stringify(inputRawData));
    rawData = inputRawData;

    // fillNull(rawData);
    // console.log(rawData);

    data.value = parseData(rawData);
    console.log(data.value);

    handleRate();
}

export { prepareData, rawData, data, reversed };