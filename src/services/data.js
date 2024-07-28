import { ref, computed } from 'vue';
import { getRate, fetchRefresh } from '@/services/api.js';
import { DataRow } from '@/utils/dataStructures.js';
import setImprovedInterval from '@/utils/improvedInterval.js';
import { passdata, chosePassdata } from '@/services/passdata';

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

async function refreshRate() {
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

    refreshRate();
}

function startSession(inputRawData) {
    chosePassdata(inputRawData.data);
    prepareData(inputRawData);
}

// refresh data
// setImprovedInterval(10, 10, async () => {
setImprovedInterval(10, 55, async () => {
    if(!rawData.value) return;

    console.log(new Date().toString().match(/\d{2}:\d{2}:\d{2}/)[0]);
    passdata.version = dbVersion;
    console.log(passdata);

    const result = await fetchRefresh(JSON.stringify(passdata));
    
    if(Array.isArray(result?.data)) {
        prepareData(result);
    } else {
        console.log(result);
    }
});

export { startSession, rawData, wholeData, data, reversed, /*dbVersion,*/ setDbVersion };