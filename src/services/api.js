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

async function dataForPassword(password) {
    setStatus.loading();

    const url = apiUrl + 'data';
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: password
        });
        const data = await response.json();

        setStatus.clear();

        return data;
    } catch (error) {
        setStatus.failed();

        console.error(error);
        // alert('Data not received!');
        loginStatus.value = 'Ну шо за інтернет? 🙄';
        // return await refetch(password);
        return await retry(dataForPassword, password);
    }
}

// async function refetch(password) {   
//     return new Promise(resolve => {
//         setTimeout(async () => {
//             resolve(await dataForPassword(password));
//         }, 5 * 1000);
//     });
// }

async function patch(date, column, value) {
    setStatus.loading();

    console.log('saving:', date, column, value);
    // console.log('not saved!');
    // return;
    const url = `${apiUrl}${date}`;
    
    try {
        const response = await fetch(url, {
            method: 'PATCH',
            body: JSON.stringify([column, value])
        });
        
        const results = await response.text();

        if(results !== '{"success":true}') {
            throw new Error('Wrong response: ' + results);
        }
        console.log('saved!');
        setStatus.clear();

        return true;
    } catch (error) {
        setStatus.failed();
        // setStatus.failed();
        console.error(error);
        // alert(`Ніц не вийшло, треба ше пробувати`);

        // return repatch(date, column, value);
        return await retry(patch, date, column, value);
    }
}

// async function repatch(date, column, value) {   
//     return new Promise(resolve => {
//         setTimeout(async () => {
//             resolve(await patch(date, column, value));
//         }, 5 * 1000);
//     });
// }

async function getRate() {
    const url = apiUrl + 'usd-rate';
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return await retry(getRate);
    }
}

export { dataForPassword, patch, getRate };