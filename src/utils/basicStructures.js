import update from '@/services/update.js';

class Parted {
    constructor(parts, dbColumn, date) {
        this.parts = JSON.parse(parts) || [];
        this.dbColumn = dbColumn;
        this.date = date;
    }

    update(parts) {
        parts = parts.map(entry => Number(entry));
        let toSave = JSON.stringify(parts);
        if(parts.length === 0 || parts[0] === 0) {
            toSave = null;
        }
        update(this.date, this.dbColumn, toSave);
    }

    get sum() {
        return this.parts.reduce((acc, num) => acc + Number(num), 0);
    }
}

class Balance {
    constructor(dbRow, dbColName, previous) {
        this.current = dbRow[dbColName];
        this.previous = previous || null;
        this.dbColName = dbColName;
        this.date = dbRow.date;
    }

    get balance() {
        return this.current !== null ? this.current : this.previous;
    }

    updateValue(newVal) {
        update(this.date, this.dbColName, newVal);
    }

    get change() {
        return this.balance - this.previous;
    }
}

class Currency {
    constructor(
        dbRow,
        dbBalance,
        previous,
        dbRate,
        previousRate,
        dbExchanges
    ) {
        this.balance = new Balance(dbRow, dbBalance, previous?.balance.balance);
        this.rate = new Balance(dbRow, dbRate, previousRate);
        this.exchanges = new Parted(dbRow[dbExchanges], dbExchanges, dbRow.date);
        this.previousHistory = previous?.history || 0;
        this.previousIncomeHistory = previous?.incomeHistory;
    }

    get availableUah() {
        return this.balance.balance * this.rate.balance || null;
    }

    get history() {
        return - this.exchanges.sum + this.previousHistory;
    }

    get incomeHistory() {
        return this.availableUah + this.history;
    }

    get income() {
        return this.incomeHistory - this.previousIncomeHistory;
    }
}

class ViraCard {
    constructor(dbRow, dbBalance, dbIncome, previousBalance) {
        this.balance = new Balance(dbRow, dbBalance, previousBalance);
        this.income = new Parted(dbRow[dbIncome], dbIncome, dbRow.date);
    }
    
    get expense() {
        return this.income.sum - this.balance.change;
    }
}

// class Field {
//     constructor(dbRow, dbColName) {
//         this.value = dbRow[dbColName];
//         this.dbColName = dbColName;
//         this.date = dbRow.date;
//     }

//     updateValue(newVal) {
//         this.value = newVal;
//         update(this.date, this.dbColName, newVal);
//     }
// }

export { Parted, Balance, Currency, ViraCard, /*Field*/ };