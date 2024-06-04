const apiUrl = import.meta.env.VITE_API_URL;

// async function receiveData() {
//     const url = apiUrl + 'data';
//     try {
//         const resp = await fetch(url);
//         const data = await resp.json();

//         return data;
//     } catch (error) {
//         console.error(error);
//         alert('Data not received!');
//     }
// }

async function dataForPassword(password) {
    const url = apiUrl + 'data';
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: password
        });
        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error);
        // alert('Data not received!');
    }
}

async function patch(date, column, value) {
    console.log('saving:', date, column, value);

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

        return true;
    } catch (error) {
        // setStatus.failed();
        console.error(error);
        alert(`Not updated!`);

        // return repatch(table, card);
    }
}

export { /*receiveData,*/ dataForPassword, patch };