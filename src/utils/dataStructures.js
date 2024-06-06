import { ref, computed } from 'vue';
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

class ViraCard {
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
        this.black = new ViraCard(
            row,
            'vira_black',
            'vira_black_income',
            previousRow?.vira.black.balance,
        );

        this.white = new ViraCard(
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

class Account {
    constructor(dbRow, dbBalance, previousBalance) {
        this.balance = ref(dbRow[dbBalance]);
        this.dbBalance = dbBalance;
        this.previousBalance = previousBalance;
        this.date = dbRow.date;
    }

    update(newVal) {
        this.balance = newVal;
        patch(this.date, this.dbBalance, newVal);
    }

    get change() {
        return this.balance - this.previousBalance;
    }
}

class Common {
    constructor(row, previousRow) {
        this.cash = new Account(row, 'common_cash', previousRow?.common.cash.balance);

        this.usd = {
            date: row.date,

            balance: row.common_usd,
            updateBalance(newVal) {
                this.balance = newVal;
                patch(this.date, 'common_usd', newVal);
            },

            rate: row.common_usd_rate,
            updateRate(newVal) {
                this.rate = newVal;
                patch(this.date, 'common_usd_rate', newVal);
            },

            get uah() {
                return this.balance * this.rate;
            },
            
            previousUah: previousRow?.common.usd.uah,

            get change() {
                return this.uah - this.previousUah;
            }
        };
    }

    get change() {
        return this.cash.change + this.usd.change;
    }

    get balance() {
        return this.cash.balance + this.usd.uah;
    }
}

class Stefko {
    constructor(row, previousRow) {
        this.credit = {
            account1: new Account(row, 'stefko_credit_1', previousRow?.stefko.credit.account1.balance),
            account2: new Account(row, 'stefko_credit_2', previousRow?.stefko.credit.account2.balance),
            account3: new Account(row, 'stefko_credit_3', previousRow?.stefko.credit.account3.balance),
            account4: new Account(row, 'stefko_credit_4', previousRow?.stefko.credit.account4.balance),
            get sum() {
                return this.account1.balance
                    + this.account2.balance
                    + this.account3.balance
                    + this.account4.balance;
            }
        }
    }
}

export { Vira, Common, Stefko };