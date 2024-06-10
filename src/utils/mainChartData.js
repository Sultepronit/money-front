import { computed } from 'vue';

import { data } from '@/services/data.js';
import Graph from './MainGraph';

const chartData = computed(() => {
    return {
        datasets: [
            new Graph('Vira', null, 'blue', 3, data, ['vira', 'balance']),
            new Graph('cash', null, 'rgba(0, 0, 0, 0.4)', 5, data, ['common', 'cash', 'balance']),
            new Graph('usd', null, 'rgba(0, 128, 0, 0.7)', 5, data, ['common', 'usd', 'uah']),
            new Graph('pumb', null, '#ff28a1', 3, data, ['stefko', 'credit', 'account1', 'balance']),
            new Graph('mono', null, '#ff5500', 3, data, ['stefko', 'credit', 'account2', 'balance']),
            new Graph('privat', null, 'yellow', 3, data, ['stefko', 'credit', 'account3', 'balance']),
            new Graph('more', null, 'red', 3, data, ['stefko', 'credit', 'account4', 'balance']),
            new Graph('pumb-deb', null, 'black', 4, data, ['stefko', 'debitAccounts', 'account1', 'balance']),
            new Graph('zp', null, 'black', 2, data, ['stefko', 'debitAccounts', 'account2', 'balance']),
            new Graph('ready', null, 'green', 2, data, ['stefko', 'debit']),
            new Graph('balance', 'rgba(0, 0, 0, 0.2)', 'white', 0, data, ['balance']),
            new Graph('credit', 'rgba(255, 0, 0, 0.15)', 'red', 2, data, ['stefko', 'credit', 'sum']),
            new Graph('debit', 'rgba(0, 255, 0, 0.2)', 'green', 2, data, ['debit']),
        ]
    }
});

export { chartData };