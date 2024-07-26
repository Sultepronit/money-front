import { ref, computed } from 'vue';
import { getRate, fetchRefresh } from '@/services/api.js';
import { DataRow } from '@/utils/dataStructures.js';
import setImprovedInterval from '@/utils/improvedInterval.js';
import refreshData from '@/services/refreshData';

let dbVersion = 0;
function setDbVersion(newVal) {
    dbVersion = newVal;
};

const rawData = ref(null);

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
    rawData.value = inputRawData.data;
    setDbVersion(inputRawData.version);

    handleRate();
}

setImprovedInterval(10, 55, refreshData);
// setImprovedInterval(5, 5, refreshData);

export { prepareData, rawData, wholeData, data, reversed, dbVersion, setDbVersion };