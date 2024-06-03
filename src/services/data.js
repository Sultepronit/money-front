import { ref, computed } from 'vue';
import { receiveData, patch } from './api.js';

const ready = ref(false); // ???
const data = ref([]);
const reversed = computed(() => data.value.slice(1).reverse());

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
    constructor(parts, dbColumn, date) {
        this.parts = JSON.parse(parts) || [];
        this.dbColumn = dbColumn;
        this.date = date;
    }

    update(parts) {
        this.parts = parts;
        patch(this.date, this.dbColumn, JSON.stringify(parts));
    }

    get sum() {
        return this.parts.reduce((acc, num) => acc + Number(num), 0);
    }
}

class Card {
    constructor(dbRow, dbBalance, dbIncome, previousBalance) {
        this.balance = ref(dbRow[dbBalance]);
        this.previousBalance = previousBalance;
        this.income = new Parted(dbRow[dbIncome], dbIncome, dbRow.date);
        this.dbBalance = dbBalance;
        this.dbIncome = dbIncome;
        this.date = dbRow.date;
    }

    saveBalance() {
        patch(this.date, this.dbBalance, this.balance);
    }

    get change() {
        return this.balance - this.previousBalance;
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
                    row,
                    'vira_black',
                    'vira_black_income',
                    previousRow?.vira.black.balance || 0,
                ),
                white: new Card(
                    row,
                    'vira_white',
                    'vira_white_income',
                    previousRow?.vira.white.balance || 0,
                ),
                cash: { 
                    income: new Parted(row.vira_cash_income, 'vira_cash_income', row.date),
                    expense: new Parted(row.vira_cash_expense, 'vira_cash_expense', row.date),
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