import { ref } from 'vue';
import { patch } from '@/services/api.js';

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

class Vira {
    constructor(row, previousRow) {
        this.black = new Card(
            row,
            'vira_black',
            'vira_black_income',
            previousRow?.vira.black.balance,
        );

        this.white = new Card(
            row,
            'vira_white',
            'vira_white_income',
            previousRow?.vira.white.balance,
        );

        this.cash = { 
            income: new Parted(row.vira_cash_income, 'vira_cash_income', row.date),
            expense: new Parted(row.vira_cash_expense, 'vira_cash_expense', row.date),
            get change() {
                return this.income.sum - this.expense.sum
            }
        };
    }

    get income() {
        return this.black.income.sum + this.white.income.sum + this.cash.income.sum;
    }
    get expense() {
        return this.black.expense + this.white.expense + this.cash.expense.sum;
    }
    get change() {
        return this.black.change + this.white.change + this.cash.change;
    }
    get balance() {
        return this.black.balance + this.white.balance;
    }
}

export { Vira };