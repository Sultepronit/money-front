import { computed } from 'vue';
import { wholeData as pastData, waitDebitChanges } from '@/services/data.js';
import { newDate, getRelativeDate, shiftDate, get29OrFeb, get30OrFeb, getTheThursday, today } from '@/utils/handleDate.js';

class TimeEntry {
    constructor(date, debit, wait, credit1, credit2, credit3, credit4) {
        this.date = newDate(date);
        this.debit = debit;
        this.wait = wait;
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
            entry.stefko.debitAccounts.account4.balance,
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

function addNextEntry(date, creditChanges, waitChange = 0) {
    const lastEntry = getLastEntry();
    const lastDate = lastEntry.date;

    let newDebit = lastEntry.debit;
    let newWait = lastEntry.wait ? lastEntry.wait - waitChange : null;
    const newCredits = [
        lastEntry.credit1 || null,
        lastEntry.credit2 || null,
        lastEntry.credit3 || null,
        lastEntry.credit4 || null
    ];

    if(creditChanges || waitChange) { 
        // console.log(waitChange);
        if(date.getDate() - lastDate.getDate() > 1) { // copy last stats to the previous to changes day
            addNextEntry(shiftDate(date, -1));
        }

        for(let i = 0; i < creditChanges.length; i++) {
            newDebit -= creditChanges[i];
            if(!creditChanges[i]) continue;
            newCredits[i] += creditChanges[i];
        }
    }

    entries.push(
        new TimeEntry(
            date || getRelativeDate(lastDate, 1, 1), // next month's 1st
            newDebit,
            newWait,
            ...newCredits
        )
    );
}

function findNearestEntry(date) {
    return entries.slice().reverse().find(entry => entry.date <= date);
}

const changesOrder = {
    set: [],
    add(date, changeIndex, change) {
        if(date <= today || !change) return;
        
        const index = date.getDate();
        if(!this.set[index]) {
            this.set[index] = { date, changes: [0, 0, 0, 0], waitChange: 0 };
        }
        if(changeIndex === -10) {
            this.set[index].waitChange = change;
        } else {
            this.set[index].changes[changeIndex] = change;
        }
    },
    implement() {
        // console.log(this.set);
        for(const entry of this.set) {
            if(!entry) continue;
            // console.log(entry);
            addNextEntry(entry.date, entry.changes, entry.waitChange);
        }
        this.set = [];
        addNextEntry(); // add the next month's 1st
    }
};

// const waitDebitChanges = [
//     ['2024-08-05', 5000],
//     ['2024-08-12', 5000],
//     ['2024-08-29', 5000],
// ];

function fillFuture() {
    let waitChangeIndex = 0;

    for(let month = 0; month < 10; month++) {
        const lastMonthThursdayEntry = findNearestEntry(getTheThursday(today, month-1));
        const lastMoths30Entry = findNearestEntry(get30OrFeb(today, month-1));
        const lastMonthsLastEntry = findNearestEntry(getRelativeDate(today, month, 0));

        changesOrder.add(getTheThursday(today, month), 3, -lastMonthThursdayEntry?.credit4);
        changesOrder.add(getRelativeDate(today, month, 24), 2, -lastMonthsLastEntry.credit3);
        changesOrder.add(get29OrFeb(today, month), 0, -lastMoths30Entry.credit1);
        changesOrder.add(getRelativeDate(today, month+1, -1), 1, -lastMonthsLastEntry.credit2);

        while(waitChangeIndex < waitDebitChanges.value.length) {
            const date = newDate(waitDebitChanges.value[waitChangeIndex][0]);
            if(date.getMonth() > (today.getMonth() + month)) break;
            changesOrder.add(date, -10, waitDebitChanges.value[waitChangeIndex][1]);
            waitChangeIndex++;
        }

        changesOrder.implement();

        const lastEntry = findNearestEntry(getRelativeDate(today, month+1, 1));
        if(!lastEntry.credit4) break;
    }
}

const timeline = computed(() => {
    fillPast(pastData);
    fillFuture();

    return entries;
});

export default timeline;
