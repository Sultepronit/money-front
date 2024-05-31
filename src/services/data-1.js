import { ref } from 'vue';
import { receiveData } from './api.js';

// let data = [];
const ready = ref(false);
const data = ref([]);

function parseBalances(data) {
    const fillable = [
        'vira_black',
        'vira_white'
    ];

    let previous = null;

    for(const row of data) {
        for(const column of fillable) {
            if(row[column] === null) {
                row[column] = previous[column];

                row[`${column}_change`] = 0;
            } else {
                row[`${column}_change`] = previous ? previous[column] - row[column] : 0;
            }
        }

        previous = row;
    }
}

function parseData(data) {
    class Parted {
        constructor(parts) {
            this.parts = parts || [0];
        }

        get sum() {
            return this.parts.reduce((acc, num) => acc + num);
        }
    }

    return data.map(row => {
        // whiteIncom = parted;
        // whiteIncom.
        return {
            date: row.date,
            vira: {
                black: {
                    title: 'чорна',
                    balance: row.vira_black,
                    change: row.vira_black_change,
                    income: new Parted(row.vira_black_income || [45, 500])
                },
                white: {
                    title: 'біла',
                    balance: row.vira_white,
                    change: row.vira_white_change,
                    income: new Parted(row.vira_white_income || [77, 100])
                    // income: new Parted(row.vira_white_income)
                },
                cash: {
                    title: 'готівка',
                    // incomeParts: row.vira_cash_income,
                    // expenceParts: row.vira_cash_expence
                    income: new Parted(row.vira_cash_income || [1000]),
                    expence: new Parted(row.vira_cash_expence || [50, 22])
                }
            }
        };
    });
}

async function prepareData() {
    const rawData = await receiveData();
    console.log(rawData);

    parseBalances(rawData);
    console.log(rawData);

    data.value = parseData(rawData);
    console.log(data.value);

    ready.value = true;
}

export { prepareData, ready, data };