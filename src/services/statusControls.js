import { ref } from 'vue';

const status = ref('');

const setStatus = {
    loading() {
        status.value = 'loading';
    },
    failed() {
        status.value = 'failed';
    },
    clear() {
        status.value = 'clear';
    }
};

export { status, setStatus };