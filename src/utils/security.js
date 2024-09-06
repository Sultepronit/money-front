import { ref } from 'vue';
import { dataForPassword } from '@/services/api.js';
import { startSession } from '@/services/data.js';

const loggedIn = ref(false);
const loginStatus = ref('Давай 😉');

function redirectUser(username) {
    if(username === 'Батько') {
        window.location.hash = '#/main';
    } else {
        window.location.hash = '';
    }
}

async function handleLogin(password, username) {
    loginStatus.value = 'Шось ся робе 😊';

    let data = null;
    if(password == 0) {
        data = JSON.parse(localStorage.getItem('rawData'));
    } else {
        data = await dataForPassword(password, username);
    }

    if(Array.isArray(data?.data)) {
        startSession(data);
        loggedIn.value = true;
    } else {
        console.log(data);
        loginStatus.value = 'Йой, шось не то 🙄';
    }
}

export { handleLogin, redirectUser, loginStatus, loggedIn };