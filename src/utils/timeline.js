import { ref, computed, watch } from 'vue';
import { wholeData as pastData } from '@/services/data.js';

function newDate(string) {
    const date = new Date(string);
    date.setHours(0);
    return date;
}

function getRelativeDate(currentDate, monthShift, day) {
    // console.log(currentDate);
    return new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + monthShift,
        day
    );
}

// const compareDates(date1, date2) {

// }

class TimeEntry {
    constructor(date, debit, credit1, credit2, credit3, credit4) {
        this.date = newDate(date);
        this.debit = debit;
        this.credit1 = credit1;
        this.credit2 = credit2;
        this.credit3 = credit3;
        this.credit4 = credit4;
    }

    get credit() {
        return this.credit1 + this.credit2 + this.credit3 + this.credit4;
    }

    get balance() {
        return this.debit + this.credit;
    }
}

let entries = [];

function fillPast(pastData) {
    entries = pastData.value.map(
        entry => new TimeEntry(
            entry.date,
            entry.stefko.debit,
            entry.stefko.credit.account1.balance,
            entry.stefko.credit.account2.balance,
            entry.stefko.credit.account3.balance,
            entry.stefko.credit.account4.balance
        )
    );
    console.log(entries);
}

function findNearestEntry(date) {
    console.log('find', date);
    return entries.slice().reverse().find(entry => entry.date.setHours(0) <= date.setHours(0));
}

function getLastEntry() {
    return entries[entries.length - 1];
}

function append(date, change) {
    const lastEntry = getLastEntry();
    const lastDate = lastEntry.date;

    if(change) { // copy last stats to the previous to changes day
        if(date.getDate() - lastDate.getDate() > 1) {
            // const previousDay = new Date(date - (24 * 60 * 60 * 1000));
            const previousDay = date - (24 * 60 * 60 * 1000);
            append(previousDay);
        }
    } else {
        change = [0, 0, 0, 0];
    }

    entries.push(
        new TimeEntry(
            date || getRelativeDate(lastDate, 1, 1), // next month's 1st
            lastEntry.debit - change.reduce((acc, val) => acc + val),
            lastEntry.credit1 + change[0],
            lastEntry.credit2 + change[1],
            lastEntry.credit3 + change[2],
            lastEntry.credit4 + change[3],
        )
    );
}

const changesSet = {
    set: [],
    add(date, changeIndex, change) {
        const index = date.getDate();
        if(!this.set[index]) {
            this.set[index] = { date, changes: [0, 0, 0, 0] };
        }
        this.set[index].changes[changeIndex] = change;

    }
};

function fillFuture() {
    const lastEntry = getLastEntry();
    const lastDate = lastEntry.date;

    const lastMonthsLastEntry = findNearestEntry(getRelativeDate(lastDate, 0, 0));
    // console.log(lastMonthsLastEntry);

    const universDebt = lastMonthsLastEntry.credit3;
    const the24 = getRelativeDate(lastDate, 0, 24)
    changesSet.add(the24, 2, -universDebt);

    const monoDebt = lastMonthsLastEntry.credit2;
    const theSecondLast = getRelativeDate(lastDate, 1, -1)
    changesSet.add(theSecondLast, 1, -monoDebt);
    
    const last30 = findNearestEntry(getRelativeDate(lastDate, -1, 30));
    const pumbDebt = last30.credit1;
    const the29 = getRelativeDate(lastDate, 0, 29);
    changesSet.add(the29, 0, -pumbDebt);

    for(const entry of changesSet.set) {
        if(!entry) continue;
        console.log(entry);
        append(entry.date, entry.changes);
    }

    append(); // add the next month's 1st

    const universDebt2 = lastEntry.credit3 - universDebt;
    append(getRelativeDate(lastDate, 1, 24), [0, 0, -universDebt2, 0]);

    const pumbDebt2 = lastEntry.credit1 - pumbDebt;
    append(getRelativeDate(lastDate, 1, 29), [-pumbDebt2, 0, 0, 0]);

    const monoDebt2 = lastEntry.credit2 - monoDebt;
    append(getRelativeDate(lastDate, 2, -1), [0, -monoDebt2, 0, 0]);

    append(); // add the next month's 1st
}

const timeline = computed(() => {
    console.log('here we go!');
    fillPast(pastData);
    fillFuture();
    
    return entries;
});



export default timeline;
