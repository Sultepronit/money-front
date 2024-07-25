import { patch } from './api.js';
import { rawData, wholeData as data } from './data.js';
import { DataRow } from '@/utils/dataStructures.js';

function update(date, column, value) {
    patch(date, column, value);

    console.log('Here I am!');

    for(let i = rawData.value.length - 1; i >= 0; i--) {
        if(rawData.value[i].date === date) {
            rawData.value[i][column] = value;
        }
    }

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