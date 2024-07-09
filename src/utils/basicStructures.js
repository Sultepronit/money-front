import { patch } from '@/services/api.js';
import update from '@/services/update.js';

class Parted {
    constructor(parts, dbColumn, date) {
        this.parts = JSON.parse(parts) || [];
        this.dbColumn = dbColumn;
        this.date = date;
    }

    update(parts) {
        this.parts = parts.map(entry => Number(entry));
        let toSave = JSON.stringify(this.parts);
        if(this.parts.length === 0 || this.parts[0] === 0) {
            toSave = null;
        }
        patch(this.date, this.dbColumn, toSave);
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
        // return this.current || this.previous;
        return this.current !== null ? this.current : this.previous;
    }

    updateValue(newVal) {
        this.current = newVal;
        update(this.date, this.dbColName, newVal);
    }

    get change() {
        return this.balance - this.previous;
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

class Field {
    constructor(dbRow, dbColName) {
        this.value = dbRow[dbColName];
        this.dbColName = dbColName;
        this.date = dbRow.date;
    }

    updateValue(newVal) {
        this.value = newVal;
        update(this.date, this.dbColName, newVal);
    }
}

export { Parted, Balance, ViraCard, Field };