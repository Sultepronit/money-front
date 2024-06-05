import { ref, computed } from 'vue';
import { patch } from './api.js';
import { Vira, Common } from '@/utils/dataStructures.js';

const data = ref([]);
const reversed = computed(() => data.value.slice(3).reverse());

function parseBalances(data) {
    const fillable = [
        'vira_black',
        'vira_white',
        'common_cash',
        'common_usd',
        'common_usd_rate'
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
        const parsedRow = {
            date: row.date,
            vira: new Vira(row, previousRow),
            common: new Common(row)
        };

        result.push(parsedRow);
        previousRow = parsedRow;
    };

    return result;
}

async function prepareData(rawData) {
    // const rawData = await receiveData();
    console.log(rawData);

    localStorage.setItem('rawData', JSON.stringify(rawData));

    parseBalances(rawData);
    console.log(rawData);

    data.value = parseData(rawData);
    console.log(data.value);
}

export { prepareData, data, reversed };