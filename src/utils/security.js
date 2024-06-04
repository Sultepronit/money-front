import { ref } from 'vue';
import { dataForPassword } from '@/services/api.js';
import { prepareData, } from '@/services/data.js';

const loggedIn = ref(false);
const loginStatus = ref('Давай 😉');

async function handleLogin(password) {
    loginStatus.value = 'Шось ся робе 😊';

    const data = await dataForPassword(password);
    if(Array.isArray(data)) {
        prepareData(data);
        loggedIn.value = true;
    } else {
        console.log(data);
        loginStatus.value = 'Йой, шось не то 🙄';
        console.log('Try harder!');
    }
}

export { handleLogin, loginStatus, loggedIn };