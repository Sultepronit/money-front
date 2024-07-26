import { fetchRefresh } from '@/services/api.js';
import { prepareData, rawData, dbVersion } from "./data";

let goPast = 50;
const passdata = {};

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

    console.log(new Date());
    passdata.version = dbVersion;
    // console.log(passdata);

    const result = await fetchRefresh(JSON.stringify(passdata));
    
    if(Array.isArray(result?.data)) {
        prepareData(result);
    } else {
        console.log(result);
    }
}

export default refreshData;