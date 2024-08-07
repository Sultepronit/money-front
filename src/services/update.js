import { patch } from './api.js';
import { rawData, setDbVersion } from './data.js';
import { passdata } from '@/services/passdata.js';

async function update(date, column, value) {
    for(let i = rawData.value.length - 1; i >= 0; i--) {
        if(rawData.value[i].date === date) {
            rawData.value[i][column] = value;
        }
    }

    console.log('saving:', date, column, value);
    const version = await patch(date, JSON.stringify([column, value, JSON.stringify(passdata)]));

    setDbVersion(version);
    console.log('new version:', version);
}

export default update;