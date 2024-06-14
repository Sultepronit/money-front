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
        this.parts = parts.map(entry => Number(entry));
        patch(this.date, this.dbColumn, JSON.stringify(this.parts));
    }

    get sum() {
        return this.parts.reduce((acc, num) => acc + Number(num), 0);
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