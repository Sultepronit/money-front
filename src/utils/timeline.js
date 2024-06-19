import { ref, computed } from 'vue';
import { wholeData as pastData } from '@/services/data.js';
import { newDate, getRelativeDate, shiftDate, get29OrFeb, get30OrFeb, getTheThursday, today } from '@/utils/handleDate.js';

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
    // console.log(entries);
}

function getLastEntry() {
    return entries[entries.length - 1];
}

function append(date, changes) {
    const lastEntry = getLastEntry();
    const lastDate = lastEntry.date;

    let newDebit = lastEntry.debit;
    const newCredits = [
        lastEntry.credit1,
        lastEntry.credit2,
        lastEntry.credit3,
        lastEntry.credit4
    ];

    if(changes) { 
        if(date.getDate() - lastDate.getDate() > 1) { // copy last stats to the previous to changes day
            append(shiftDate(date, -1));
        }

        for(let i = 0; i < changes.length; i++) {
            if(changes[i] === 'nullify') {
                newDebit += newCredits[i];
                newCredits[i] = 0;
            } else if(changes[i] > 0) {
                newDebit -= changes[i];
                newCredits[i] += changes[i];
            }
        }
    }

    entries.push(
        new TimeEntry(
            date || getRelativeDate(lastDate, 1, 1), // next month's 1st
            newDebit,
            ...newCredits
        )
    );
}

function findNearestEntry(date) {
    console.log('find', date);
    return entries.slice().reverse().find(entry => entry.date <= date);
}

const changesOrder = {
    set: [],
    add(date, changeIndex, change) {
        const index = date.getDate();
        if(!this.set[index]) {
            this.set[index] = { date, changes: [0, 0, 0, 0] };
        }
        this.set[index].changes[changeIndex] = change;
    },
    implement() {
        for(const entry of this.set) {
            if(!entry) continue;
            if(entry.date <= today) continue;
            console.log(entry);
            append(entry.date, entry.changes);
        }
        this.set = [];
        append(); // add the next month's 1st
    }
};

const report = ref([]);

function fillFuture() {
    // this month
    const lastMoths30Entry = findNearestEntry(get30OrFeb(today, -1));
    const lastMonthsLastEntry = findNearestEntry(getRelativeDate(today, 0, 0));
    const thisMonthThursday = getTheThursday(today, 0);

    changesOrder.add(thisMonthThursday, 3, 2366);
    const the24 = getRelativeDate(today, 0, 24);
    console.log(the24);
    // changesOrder.add(getRelativeDate(today, 0, 24), 2, -lastMonthsLastEntry.credit3);
    changesOrder.add(the24, 2, -lastMonthsLastEntry.credit3);
    changesOrder.add(get29OrFeb(today), 0, -lastMoths30Entry.credit1);
    changesOrder.add(getRelativeDate(today, 1, -1), 1, -lastMonthsLastEntry.credit2);
    changesOrder.implement();

    // second month
    const thisMonthThursdayEntry = findNearestEntry(thisMonthThursday);

    changesOrder.add(getTheThursday(today, 1), 3, -thisMonthThursdayEntry.credit4);
    changesOrder.add(getRelativeDate(today, 1, 24), 2, 'nullify');
    changesOrder.add(get29OrFeb(today, 1), 0, 'nullify');
    changesOrder.add(getRelativeDate(today, 2, -1), 1, 'nullify');
    changesOrder.implement();

    // third month
    const lastEntry = findNearestEntry(getRelativeDate(today, 2, 1));
    report.value.push(lastEntry);
    // console.log(report);
    if(lastEntry.credit4 === 0) return;

    changesOrder.add(getTheThursday(today, 2), 3, 'nullify');
    changesOrder.implement();
}

const timeline = computed(() => {
    console.log('here we go!');
    fillPast(pastData);
    report.value = [getLastEntry()];
    fillFuture();
    console.log(entries);
    console.log(report.value);
    
    return entries;
});

export default timeline;
export { report };
