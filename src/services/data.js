import { ref, computed } from 'vue';
import { patch } from './api.js';
import { DataRow, Vira, Common, Stefko } from '@/utils/dataStructures.js';

const data = ref([]);
let rawData = [];
const reversed = computed(() => data.value.slice(3).reverse());

function fillNull(data) {
    const fillable = [
        'vira_black',
        'vira_white',
        // 'common_cash',
        // 'common_usd',
        // 'common_usd_rate',
        // 'stefko_credit_1',
        // 'stefko_credit_2',
        // 'stefko_credit_3',
        // 'stefko_credit_4',
        // 'stefko_debit_1',
        // 'stefko_debit_2',
    ];

    // let previous = null;
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

async function prepareData(inputRawData) {
    console.log(inputRawData);
    localStorage.setItem('rawData', JSON.stringify(inputRawData));
    rawData = inputRawData;

    fillNull(rawData);
    console.log(rawData);

    data.value = parseData(rawData);
    console.log(data.value);
}

export { prepareData, rawData, data, reversed };