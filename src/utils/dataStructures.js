import { ref, computed } from 'vue';
import { patch } from '@/services/api.js';
import update from '@/services/update.js';

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
    get balanceChange() {
        return this.black.change + this.white.change;
    }
}

class Balance {
    constructor(dbRow, dbColName, previous) {
        this.current = dbRow[dbColName];
        this.previous = previous;
        this.dbColName = dbColName;
        this.date = dbRow.date;
    }

    get balance() {
        return this.current || this.previous;
    }

    updateValue(newVal) {
        this.current = newVal;
        update(this.date, this.dbColName, newVal);
    }

    get change() {
        return this.balance - this.previous;
    }
}

class Common {
    constructor(row, previousRow) {
        // this.cash = new Account(row, 'common_cash', previousRow?.common.cash.balance);
        this.cash = new Balance(row, 'common_cash', previousRow?.common.cash.balance);

        this.usd = {
            date: row.date,
            balance: new Balance(row, 'common_usd', previousRow?.common.usd.balance.balance),
            rate: new Balance(row, 'common_usd_rate', previousRow?.common.usd.rate.balance),

            get uah() {
                // console.log(this.balance.balance);
                return this.balance.balance * this.rate.balance;
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
            account1: new Balance(row, 'stefko_credit_1', previousRow?.stefko.credit.account1.balance),
            account2: new Balance(row, 'stefko_credit_2', previousRow?.stefko.credit.account2.balance),
            account3: new Balance(row, 'stefko_credit_3', previousRow?.stefko.credit.account3.balance),
            account4: new Balance(row, 'stefko_credit_4', previousRow?.stefko.credit.account4.balance),
            get sum() {
                return this.account1.balance
                    + this.account2.balance
                    + this.account3.balance
                    + this.account4.balance;
            },
            get change() {
                return this.account1.change
                    + this.account2.change
                    + this.account3.change
                    + this.account4.change;
            }
        };

        this.debitAccounts = {
            account1: new Balance(row, 'stefko_debit_1', previousRow?.stefko.debitAccounts.account1.balance),
            account2: new Balance(row, 'stefko_debit_2', previousRow?.stefko.debitAccounts.account2.balance),
            get sum() {
                return this.account1.balance + this.account2.balance;
            },
            get change() {
                return this.account1.change + this.account2.change;
            }
        };

        this.others = {
            marta: new Balance(row, 'others_marta', previousRow?.stefko.others.marta.balance)
        }
    }

    get debit() {
        return this.debitAccounts.sum - this.others.marta.balance;
    };

    get debitChange() {
        return this.debitAccounts.change - this.others.marta.change;
    }

    get balance() {
        return this.credit.sum + this.debit;
    };

    get change() {
        return this.credit.change + this.debitChange;
    };
}

// class Others {
//     constructor(row, previousRow) {
//         this.marta = new Balance(row, 'others_marta', previousRow?.others.marta.balance);
//     }
// }

class DataRow {
    constructor(rawRow, previousRow) {
        this.date = rawRow.date;
        this.vira = new Vira(rawRow, previousRow);
        this.common = new Common(rawRow, previousRow);
        this.stefko = new Stefko(rawRow, previousRow);
        // this.others = new Others(rawRow, previousRow);
        this.income = new Parted(rawRow['total_income'], 'total_income', rawRow.date);
    };
    
    get debit() {
        return this.vira.balance
            + this.common.balance
            + this.stefko.debit;
    };

    get balance() {
        return this.vira.balance
            + this.common.balance
            + this.stefko.balance;
    };

    get change() {
        return this.vira.balanceChange
            + this.common.change
            + this.stefko.change;
    }
};

export { DataRow, Vira, Common, Stefko };