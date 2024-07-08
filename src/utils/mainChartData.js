import { computed } from 'vue';

import { wholeData as data } from '@/services/data.js';
import { LineSet } from '@/utils/chartDataSets.js';

const chartData = computed(() => {
    return {
        datasets: [
            new LineSet('Stefko', null, 'green', 4, data, ['stefko', 'balance']),
            new LineSet('Vira', null, 'blue', 3, data, ['vira', 'balance']),
            new LineSet('cash', null, 'rgba(0, 0, 0, 0.4)', 5, data, ['common', 'cash', 'balance']),
            new LineSet('usd', null, 'rgba(0, 255, 0, 1)', 5, data, ['common', 'usd', 'uah']),
            new LineSet('pumb', null, '#ff28a1', 3, data, ['stefko', 'credit', 'account1', 'balance']),
            new LineSet('mono', null, '#ff5500', 3, data, ['stefko', 'credit', 'account2', 'balance']),
            new LineSet('privat', null, 'yellow', 3, data, ['stefko', 'credit', 'account3', 'balance']),
            new LineSet('more', null, 'red', 3, data, ['stefko', 'credit', 'account4', 'balance']),
            // new LineSet('pumb-deb', null, 'black', 4, data, ['stefko', 'debitAccounts', 'account1', 'balance']),
            // new LineSet('zp', null, 'black', 2, data, ['stefko', 'debitAccounts', 'account2', 'balance']),
            new LineSet('wait', null, 'black', 4, data, ['stefko', 'debitAccounts', 'account4', 'balance']),
            new LineSet('ready', null, 'black', 2, data, ['stefko', 'debitReady']),
            new LineSet('s-balance', null, 'green', 2, data, ['stefko', 'debit']),
            new LineSet('balance', 'rgba(0, 0, 0, 0.2)', 'white', 0, data, ['balance']),
            new LineSet('credit', 'rgba(255, 0, 0, 0.15)', 'red', 2, data, ['stefko', 'credit', 'sum']),
            new LineSet('debit', 'rgba(0, 255, 0, 0.3)', 'green', 2, data, ['debit']),
        ]
    }
});

export { chartData };