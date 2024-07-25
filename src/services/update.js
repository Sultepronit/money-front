import { patch } from './api.js';
import { rawData, dbVersion, setDbVersion, wholeData as data } from './data.js';
// import { DataRow } from '@/utils/dataStructures.js';

async function update(date, column, value) {
    // console.log('Here I am!');

    for(let i = rawData.value.length - 1; i >= 0; i--) {
        if(rawData.value[i].date === date) {
            rawData.value[i][column] = value;
        }
    }

    const version = await patch(date, column, value);
    setDbVersion(version);
    console.log('new version:', version);

    // let notYet = true;
    // for(let i = 0; i < rawData.length; i++) {
    //     if(rawData[i].date === date) {
    //         rawData[i][column] = value;
    //         notYet = false;
    //         continue;
    //     }

    //     if(notYet) continue;

    //     // data.value[i] = new DataRow(rawData[i], data.value[i - 1]);
    // }

    // console.log(rawData);
}

export default update;