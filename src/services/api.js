const apiUrl = import.meta.env.VITE_API_URL;

async function receiveData() {
    try {
        const resp = await fetch(apiUrl);
        const data = await resp.json();

        return data;
    } catch (error) {
        console.error(error);
        alert('Data not received!');
    }
}

async function patch(date, changes) {
    console.log('saving:', date, changes);

    const url = `${apiUrl}${date}`;
    
    try {
        const response = await fetch(url, {
            method: 'PATCH',
            body: JSON.stringify(changes)
        });
        
        const results = await response.text();

        if(results !== '{"success":true}') {
            throw new Error('Wrong response: ' + results);
        }
        // console.log('saved!')
        // updateOrder.remove();

        return true;
    } catch (error) {
        // setStatus.failed();
        console.error(error);
        // alert(`Not updated!`);

        // return repatch(table, card);
    }
}

export { receiveData, patch };