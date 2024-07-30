import { put } from './api.js';
import { setDbVersion } from './data.js';
import { passdata } from '@/services/passdata.js';

async function updateWaitChanges(changes) {
    // const json = JSON.stringify(changes);
    console.log('saving:', changes);
    const version = await put('wait-debit', JSON.stringify([changes, JSON.stringify(passdata)]));

    setDbVersion(version);
    console.log('new version:', version);
}

export default updateWaitChanges;