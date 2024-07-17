import { ref, computed } from 'vue';
import { wholeData as pastData } from '@/services/data.js';
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
            if(creditChanges[i] === 'nullify') {
                newDebit += newCredits[i];
                newCredits[i] = 0;
            } else if(creditChanges[i] > 0) {
                newDebit -= creditChanges[i];
                newCredits[i] += creditChanges[i];
            }
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
    // console.log('find', date);
    return entries.slice().reverse().find(entry => entry.date <= date);
}

const changesOrder = {
    set: [],
    add(date, changeIndex, change) {
        const index = date.getDate();
        // const index = (date - today) / (24 * 60 * 60 * 1000);
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
        console.log(this.set);
        for(const entry of this.set) {
            if(!entry) continue;
            if(entry.date <= today) continue;
            console.log(entry);
            addNextEntry(entry.date, entry.changes, entry.waitChange);
        }
        this.set = [];
        addNextEntry(); // add the next month's 1st
    }
};

const waitDebitChanges = [
    ['2024-07-21', 5000],
    ['2024-07-22', 5500],
    ['2024-08-05', 5000],
    ['2024-08-12', 5000],
];

function addWaitChanges(index, monthCounter) {
    while(index < waitDebitChanges.length) {
        const date = newDate(waitDebitChanges[index][0]);
        if(date.getMonth() > (today.getMonth() + monthCounter)) break;
        changesOrder.add(date, -10, waitDebitChanges[index][1]);
        index++;
    }
}

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

        while(waitChangeIndex < waitDebitChanges.length) {
            const date = newDate(waitDebitChanges[waitChangeIndex][0]);
            if(date.getMonth() > (today.getMonth() + month)) break;
            changesOrder.add(date, -10, waitDebitChanges[waitChangeIndex][1]);
            waitChangeIndex++;
        }

        changesOrder.implement();

        const lastEntry = findNearestEntry(getRelativeDate(today, month+1, 1));
        if(!lastEntry.credit4) break;
    }

    // // this month
    // const lastMonthThursdayEntry = findNearestEntry(getTheThursday(today, -1));
    // const lastMoths30Entry = findNearestEntry(get30OrFeb(today, -1));
    // const lastMonthsLastEntry = findNearestEntry(getRelativeDate(today, 0, 0));
    // const thisMonthThursday = getTheThursday(today, 0);

    // changesOrder.add(thisMonthThursday, 3, -lastMonthThursdayEntry?.credit4);
    // changesOrder.add(getRelativeDate(today, 0, 24), 2, -lastMonthsLastEntry.credit3);
    // changesOrder.add(get29OrFeb(today), 0, -lastMoths30Entry.credit1);
    // changesOrder.add(getRelativeDate(today, 1, -1), 1, -lastMonthsLastEntry.credit2);

    // addWaitChanges(waitChangeIndex, 0);
    // while(waitChangeIndex < waitDebitChanges.length) {
    //     const date = newDate(waitDebitChanges[waitChangeIndex][0]);
    //     if(date.getMonth() > today.getMonth()) break;
    //     changesOrder.add(date, -10, waitDebitChanges[waitChangeIndex][1]);
    //     waitChangeIndex++;
    // }

    // changesOrder.implement();

    // // second month
    // const thisMonthThursdayEntry = findNearestEntry(thisMonthThursday);

    // changesOrder.add(getTheThursday(today, 1), 3, -thisMonthThursdayEntry.credit4);
    // changesOrder.add(getRelativeDate(today, 1, 24), 2, 'nullify');
    // changesOrder.add(get29OrFeb(today, 1), 0, 'nullify');
    // changesOrder.add(getRelativeDate(today, 2, -1), 1, 'nullify');

    // while(waitChangeIndex < waitDebitChanges.length) {
    //     const date = newDate(waitDebitChanges[waitChangeIndex][0]);
    //     if(date.getMonth() > today.getMonth() + 1) break;
    //     changesOrder.add(date, -10, waitDebitChanges[waitChangeIndex][1]);
    //     waitChangeIndex++;
    // }

    // changesOrder.implement();

    // // third month
    // const lastEntry = findNearestEntry(getRelativeDate(today, 2, 1));
    // if(!lastEntry.credit4) return;

    // changesOrder.add(getTheThursday(today, 2), 3, 'nullify');
    // changesOrder.implement();
}

const timeline = computed(() => {
    fillPast(pastData);
    fillFuture();

    return entries;
});

export default timeline;
