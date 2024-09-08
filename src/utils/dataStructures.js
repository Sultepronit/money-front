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
            date: row.date, // do we need it here???
            balance: new Balance(row, 'common_usd', previousRow?.common.usd.balance.balance),
            rate: new Balance(row, 'common_usd_rate', previousRow?.common.usd.rate.balance),

            get uah() {
                return this.balance.balance * this.rate.balance;
            },
            
            previousUah: previousRow?.common.usd.uah,

            get change() {
                return this.uah - this.previousUah;
            },

            get income() {
                return this.balance.previous * this.rate.change;
            }
        };

        this.eur = {
            rate: new Balance(row, 'common_eur_rate', previousRow?.common.eur.rate.balance)
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
            account3: new Balance(row, 'stefko_debit_3', previousRow?.stefko.debitAccounts.account3.balance),
            account4: new Balance(row, 'stefko_debit_4', previousRow?.stefko.debitAccounts.account4.balance),
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

        this.currency = {
            eur: {
                balance: new Balance(row, 'stefko_eur', previousRow?.stefko.currency.eur.balance.balance),
                rate: new Balance(row, 'common_eur_rate', previousRow?.common.eur.rate.balance),
                get uah() {
                    return this.balance.balance * this.rate.balance || null;
                },
                previousUah: previousRow?.stefko.currency.eur.uah,
                get change() {
                    return this.uah - (this.previousUah);
                },
                get income() {
                    return this.balance.previous * this.rate.change;
                }
            },

            get income() {
                return this.eur.income;
            }
        }

        this.income = new Parted(row['stefko_income'], 'stefko_income', row.date);

        this.others = {
            marta: new Balance(row, 'others_marta', previousRow?.stefko.others.marta.balance)
        }
    }

    get debit() {
        return this.debitAccounts.sum + this.currency.eur.uah - this.others.marta.balance;
    };

    get debitReady() {
        return this.debitAccounts.account1.balance
            + this.debitAccounts.account2.balance
            + this.debitAccounts.account3.balance
            // + this.currency.eurToUah
            - this.others.marta.balance;
    };

    get debitChange() {
        return this.debitAccounts.change
            + this.currency.eur.change
            - this.others.marta.change;
    }

    get balance() {
        return this.credit.sum + this.debit;
    };

    get change() {
        return this.credit.change + this.debitChange;
    };
}

class AdditionalIncome {
    constructor(rawRow) {
        this.cancel = new Parted(rawRow['income_cancel'], 'income_cancel', rawRow.date);
        this.debit = new Parted(rawRow['income_debit'], 'income_debit', rawRow.date);
    }

    get sum() {
        return this.debit.sum - this.cancel.sum;
    }
}

class DataRow {
    constructor(rawRow, previousRow) {
        this.date = rawRow.date;
        this.vira = new Vira(rawRow, previousRow);
        this.common = new Common(rawRow, previousRow);
        this.stefko = new Stefko(rawRow, previousRow);
        this.additionalIncome = new AdditionalIncome(rawRow);
    };
    
    get debit() {
        return Math.round(
            this.vira.balance
            + this.common.balance
            + this.stefko.debit
        );
    };

    get balance() {
        return Math.round(
            this.vira.balance
            + this.common.balance
            + this.stefko.balance
        );
    };

    get change() {
        return Math.round(
            this.vira.balanceChange
            + this.common.change
            + this.stefko.change
        );
    }

    get income() {
        return Math.round(
            this.stefko.income.sum
            + this.stefko.currency.income
            + this.vira.income
            + this.additionalIncome.sum
            + this.common.usd.income
        );
    }

    get expense() {
        return this.change - this.income;
    }
};

export { DataRow };