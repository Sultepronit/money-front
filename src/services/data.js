import { ref, computed } from 'vue';
import { getRate, dataForPassword } from '@/services/api.js';
// import { getRate } from './api.js';
import { DataRow } from '@/utils/dataStructures.js';

// let rawData = [];
// const wholeData = ref([]);
// const data = computed(() => wholeData.value.slice(3));
// const reversed = computed(() => data.value.slice().reverse());

const dbVersion = ref(-1);
function setDbVersion(newVal) {
    dbVersion.value = newVal;
    console.log('update!');
    console.log(dbVersion);
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

    // wholeData.value = parseData(rawData);
    // console.log(data.value);

    handleRate();
}

let goPast = 50;
let passdata = {
    date: '',
    column: '',
    value: null,
};

function chosePassdata() {
    const theEntry = rawData.value[rawData.value.length - goPast];
    console.log(theEntry.date);

    for(const colName in theEntry) {
        if(colName === 'date') continue;
        if(String(theEntry[colName]).length > 6) {
            passdata.date = theEntry.date;
            passdata.column = colName;
            passdata.value = theEntry[colName];
            break;
        }
    }

    console.log(passdata);
    if(!passdata.date) {
        goPast++;
        chosePassdata();
    }
    
    refreshData();
}

async function refreshData() {
    if(!rawData.value) return;
    if(!passdata.date) {
        chosePassdata();
        return;
    }

    console.log(passdata);
    console.log(new Date());

    passdata.version = dbVersion.value;
    const result = await dataForPassword(JSON.stringify(passdata));
    
    if(Array.isArray(result)) {
        prepareData(result);
    } else {
        console.log(result);
    }
}

// setInterval(() => refreshData(), 10 * 60 * 1000);
setInterval(() => refreshData(), 60 * 1000);

setInterval(() => {
    console.log(Date.now());
}, 10 * 1000);

export { dbVersion, setDbVersion, prepareData, rawData, wholeData, data, reversed };