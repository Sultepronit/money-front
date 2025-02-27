import { ref, computed } from 'vue';
import { getUsdRate, getEurRate, fetchRefresh } from '@/services/api.js';
import { DataRow } from '@/utils/dataStructures.js';
// import setImprovedInterval from '@/utils/improvedInterval.js';
import { passdata, chosePassdata } from '@/services/passdata';

const rawData = ref(null);
const waitDebitChanges = ref(null);
let dbVersion = 0;
function setDbVersion(newVal) {
    dbVersion = newVal;
}

function parseData(data) {
    const result = [];
    let previousRow = null;
    for (const row of data) {
        const parsedRow = new DataRow(row, previousRow);

        result.push(parsedRow);
        previousRow = parsedRow;
    }

    console.log(result);

    return result;
}

const wholeData = computed(() => parseData(rawData.value));
const data = computed(() => wholeData.value.slice(3));
const reversed = computed(() => data.value.slice().reverse());
const reversed93 = computed(() => reversed.value.slice(0, 93));

async function refreshRate() {
    if (reversed.value[0].common.rates.usd.current === null) {
        const newRate = await getUsdRate();
        reversed.value[0].common.rates.usd.updateValue(newRate.rate);
    }

    if (reversed.value[0].common.rates.eur.current === null) {
        const newRate = await getEurRate();
        reversed.value[0].common.rates.eur.updateValue(newRate.rate);
    }
}

function prepareData(inputRawData) {
    console.log(inputRawData);
    localStorage.setItem('rawData', JSON.stringify(inputRawData));

    rawData.value = inputRawData.data;

    waitDebitChanges.value = JSON.parse(inputRawData.wait_debit) || [];

    setDbVersion(inputRawData.version);

    refreshRate();
}

function startSession(inputRawData) {
    chosePassdata(inputRawData.data);
    prepareData(inputRawData);
}

// refresh data
let lastTime = Date.now();
async function refresh() {
    if (!rawData.value) return;

    console.log(new Date().toString().match(/\d{2}:\d{2}:\d{2}/)[0]);
    passdata.version = dbVersion;
    // console.log(passdata);

    const result = await fetchRefresh(JSON.stringify(passdata));

    if (Array.isArray(result?.data)) {
        prepareData(result);
    } else {
        if (!result) {
            // refresh failed
            lastTime -= 50 * 1000;
        }
        console.log(result);
    }
}

function tryToRefresh() {
    document.removeEventListener('mousemove', tryToRefresh);
    document.removeEventListener('touchmove', tryToRefresh);

    const now = Date.now();
    console.log((now - lastTime) / 1000);

    if (now - lastTime < 60 * 1000) return;

    lastTime = now;

    refresh();
}

function addListeners() {
    document.addEventListener('mousemove', tryToRefresh);
    document.addEventListener('touchmove', tryToRefresh);
}

setInterval(addListeners, 30 * 1000);

// setInterval(async () => {
//     if(!rawData.value) return;

//     console.log(new Date().toString().match(/\d{2}:\d{2}:\d{2}/)[0]);
//     passdata.version = dbVersion;
//     // console.log(passdata);

//     const result = await fetchRefresh(JSON.stringify(passdata));

//     if(Array.isArray(result?.data)) {
//         prepareData(result);
//     } else {
//         console.log(result);
//     }
// }, 60 * 1000);
// }, 10 * 1000);

export {
    startSession,
    rawData,
    wholeData,
    data,
    reversed,
    reversed93,
    waitDebitChanges,
    setDbVersion
};
