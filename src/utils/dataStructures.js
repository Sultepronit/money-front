import { Parted, Balance, ViraCard, Field } from './basicStructures.js';

class Vira {
    constructor(row, previousRow) {
        this.black = new ViraCard(
            row,
            'vira_black',
            'vira_black_income',
            previousRow?.vira.black.balance.balance,
        );

        this.white = new ViraCard(
            row,
            'vira_white',
            'vira_white_income',
            previousRow?.vira.white.balance.balance,
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
        return this.black.balance.change + this.white.balance.change + this.cash.change;
    }
    get balance() {
        return this.black.balance.balance + this.white.balance.balance;
    }
    get balanceChange() {
        return this.black.balance.change + this.white.balance.change;
    }
}

class Common {
    constructor(row, previousRow) {
        this.cash = new Balance(row, 'common_cash', previousRow?.common.cash.balance);

        this.usd = {
            date: row.date,
            balance: new Balance(row, 'common_usd', previousRow?.common.usd.balance.balance),
            rate: new Balance(row, 'common_usd_rate', previousRow?.common.usd.rate.balance),

            get uah() {
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

        this.income = new Parted(row['stefko_income'], 'stefko_income', row.date);

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

class CommonIncome {
    constructor(rawRow) {
        this.cancel = new Parted(rawRow['income_cancel'], 'income_cancel', rawRow.date);
        this.debit = new Parted(rawRow['income_debit'], 'income_debit', rawRow.date);
        this.exchangeUsd = new Field(rawRow, 'income_exchange_usd');
    }

    get sum() {
        return this.debit.sum + this.exchangeUsd.value - this.cancel;
    }
}

class DataRow {
    constructor(rawRow, previousRow) {
        this.date = rawRow.date;
        this.vira = new Vira(rawRow, previousRow);
        this.common = new Common(rawRow, previousRow);
        this.stefko = new Stefko(rawRow, previousRow);
        // this.income = new Parted(rawRow['stefko_income'], 'stefko_income', rawRow.date);
        this.commonIncome = new CommonIncome(rawRow);
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

    get income() {
        return this.stefko.income.sum
            + this.vira.income
            + this.commonIncome.sum;
    }
};

export { DataRow };