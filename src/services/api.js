import { loginStatus } from '@/utils/security.js';
import { setStatus } from './statusControls.js';

const apiUrl = import.meta.env.VITE_API_URL;

async function retry(callback, ...args) {   
    return new Promise(resolve => {
        setTimeout(async () => {
            resolve(await callback(...args));
        }, 5 * 1000);
    });
}

async function fetchWithFeatures(path, options, refetch = true) {
    setStatus.loading();

    try {
        const response = await fetch(apiUrl + path, options);
        const result = await response.json();

        setStatus.clear();

        return result;
    } catch (error) {
        if(error.message.includes('Failed to fetch')) {
            if(refetch) {
                setStatus.failed();
                loginStatus.value = 'Ну шо за інтернет? 🙄';
                return await retry(fetchWithFeatures, path, options, refetch);
            } else {
                setStatus.clear();
            }
        } else {
            setStatus.failed();
            console.error(error);
        }
    }
}

async function dataForPassword(password) {
    return await fetchWithFeatures('data', {
        method: 'POST',
        body: password
    });
}

async function fetchRefresh(passdata) {
    return await fetchWithFeatures('refresh', {
        method: 'POST',
        body: passdata,
    }, false);
}

async function patch(date, data) {
    // console.log('not saved!');
    // return;

    const results = await fetchWithFeatures(date, {
        method: 'PATCH',
        body: data
    });

    if(!results?.version) {
        setStatus.failed();
        console.error('Wrong response:', results);
    } else {
        return results.version;
    }
}

async function getRate() {
    return await fetchWithFeatures('usd-rate');
}

export { dataForPassword, fetchRefresh, patch, getRate };