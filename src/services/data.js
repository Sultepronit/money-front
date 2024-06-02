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
            } 
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
        console.log('save', parts);
    }

    get sum() {
        return this.parts.reduce((acc, num) => acc + Number(num), 0);
    }
}

class Card {
    constructor(balance, previous, income) {
        this.balance = ref(balance);
        this.previous = previous;
        this.income = new Parted(income);
    }

    get change() {
        return this.balance - this.previous;
    }

    get expense() {
        return this.income.sum - this.change;
    }
}

function parseData(data) {
    const result = [];
    let previousRow = null;
    for(const row of data) {
        const parsedRow = {
            date: row.date,
            vira: {
                black: new Card(
                    row.vira_black,
                    previousRow?.vira.black.balance || 0,
                    row.vira_black_income
                ),
                white: new Card(
                    row.vira_white,
                    previousRow?.vira.white.balance || 0,
                    row.vira_white_income
                ),
                cash: {
                    income: new Parted(row.vira_cash_income),
                    expense: new Parted(row.vira_cash_expense),
                    get change() {
                        return this.income.sum - this.expense.sum
                    }
                },
                get income() {
                    return this.black.income.sum + this.white.income.sum + this.cash.income.sum;
                },
                get expense() {
                    return this.black.expense + this.white.expense + this.cash.expense.sum;
                },
                get change() {
                    return this.black.change + this.white.change + this.cash.change;
                },
                get balance() {
                    return this.black.balance + this.white.balance;
                }
            }
        };

        result.push(parsedRow);
        previousRow = parsedRow;
    };

    return result;
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