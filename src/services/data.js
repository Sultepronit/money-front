import { ref, computed } from 'vue';
import { receiveData } from './api.js';

const ready = ref(false); // ???
const data = ref([]);
const reversed = computed(() => data.value.slice().reverse());

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

                // row[`${column}_change`] = 0;
            } else {
                // row[`${column}_change`] = previous ? previous[column] - row[column] : 0;
            }

            row[`${column}_previous`] = previous ? previous[column] : 0;
        }

        previous = row;
    }
}

class Parted {
    constructor(parts) {
        this.parts = parts || [];
    }

    update(parts) {
        this.parts = parts;
    }

    get sum() {
        return this.parts.reduce((acc, num) => acc + Number(num), 0);
    }
}

class Card {
    constructor(title, balance, previous, income) {
        this.title = title;
        this.balance = balance;
        this.previous = previous;
        this.income = new Parted(income);
    }

    get change() {
        return this.balance - this.previous;
    }

    get expence() {
        return this.income.sum - this.change;
    }
}

function parseData(data) {
    return data.map(row => {
        return {
            date: row.date,
            vira: {
                black: new Card(
                    'чорна',
                    row.vira_black,
                    row.vira_black_previous,
                    row.vira_black_income
                ),
                white: new Card(
                    'біла',
                    row.vira_white,
                    row.vira_white_previous,
                    row.vira_white_income || [77, 100]
                ),
                cash: {
                    title: 'готівка',
                    income: new Parted(row.vira_cash_income || [1000]),
                    expence: new Parted(row.vira_cash_expence || [50, 22]),
                    get change() {
                        return this.income.sum - this.expence.sum
                    }
                },
                get income() {
                    return this.black.income.sum + this.white.income.sum + this.cash.income.sum;
                },
                get expence() {
                    return this.black.expence + this.white.expence + this.cash.expence.sum;
                },
                get change() {
                    return this.black.change + this.white.change + this.cash.change;
                },
                get balance() {
                    return this.black.balance + this.white.balance;
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

export { prepareData, ready, data, reversed };