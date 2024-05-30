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

export { receiveData };