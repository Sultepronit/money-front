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

async function handleError(error, callback, ...args) {
    setStatus.failed();
    if(error.message.includes('Failed to fetch')) {
        // console.log('Bingo!');
        return await retry(callback, ...args);
    } else {
        console.error(error);
    }
}

async function fetchWithFeatures(path, options, refetch = true) {
    setStatus.loading();

    try {
        const response = await fetch(apiUrl + path, options);
        const result = await response.json();

        setStatus.clear();

        return result;
    } catch (error) {
        setStatus.failed();

        if(error.message.includes('Failed to fetch')) {
            loginStatus.value = 'Ну шо за інтернет? 🙄';
            if(refetch) {
                return await retry(fetchWithFeatures, path, options, refetch);
            }
        } else {
            console.error(error);
        }
    }
}

async function dataForPassword(password) {
    return await fetchWithFeatures('data', {
        method: 'POST',
        body: password
    });
    // setStatus.loading();

    // const url = apiUrl + 'data';
    // try {
    //     const response = await fetch(url, {
    //         method: 'POST',
    //         body: password
    //     });
    //     const data = await response.json();

    //     setStatus.clear();

    //     return data;
    // } catch (error) {
    //     setStatus.failed();
    //     console.error(error);
    //     loginStatus.value = 'Ну шо за інтернет? 🙄';

    //     return await retry(dataForPassword, password);
    // }
}

async function fetchRefresh(passdata) {
    return await fetchWithFeatures('data', {
        method: 'POST',
        body: passdata
    }, false)

    // setStatus.loading();

    // const url = apiUrl + 'data';
    // try {
    //     const response = await fetch(url, {
    //         method: 'POST',
    //         body: passdata
    //     });
    //     const data = await response.json();

    //     setStatus.clear();

    //     return data;
    // } catch (error) {
    //     setStatus.failed();
    //     console.error(error);
    //     console.log(error.name);
    //     console.log(error.message);
    //     if(error.message.includes('Failed to fetch')) {
    //         console.log('Bingo!');
    //     }
    // }
}

async function patch(date, column, value) {
    // console.log('not saved!');
    // return;

    const results = await fetchWithFeatures(date, {
        method: 'PATCH',
        body: JSON.stringify([column, value])
    });

    if(!results?.version) {
        setStatus.failed();
        console.error('Wrong response:', results);
    } else {
        return results.version;
    }


    // setStatus.loading();

    // // console.log('saving:', date, column, value);
    
    // const url = `${apiUrl}${date}`;
    
    // try {
    //     const response = await fetch(url, {
    //         method: 'PATCH',
    //         body: JSON.stringify([column, value])
    //     });
        
    //     // const results = await response.text();
    //     const results = await response.json();

    //     // if(results !== '{"success":true}') {
    //     if(!results?.version) {
    //         // throw new Error('Wrong response: ' + results);
    //         setStatus.failed();
    //         console.error('Wrong response:', results);
    //     }
    //     // console.log('saved!');
    //     setStatus.clear();

    //     return results.version;
    // } catch (error) {
    //     setStatus.failed();
    //     console.error(error);

    //     return await retry(patch, date, column, value);
    // }
}

async function getRate() {
    return await fetchWithFeatures('usd-rate');
    // const url = apiUrl + 'usd-rate';
    // try {
    //     const response = await fetch(url);
    //     const data = await response.json();
    //     return data;
    // } catch (error) {
    //     console.error(error);
    //     return await retry(getRate);
    // }
}

export { dataForPassword, fetchRefresh, patch, getRate };