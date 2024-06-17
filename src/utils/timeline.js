import { ref, computed, watch } from 'vue';
import { wholeData as pastData } from '@/services/data.js';

function newDate(string) {
    const date = new Date(string);
    date.setHours(0);
    return date;
}

function getRelativeDate(currentDate, monthShift, day) {
    console.log(currentDate);
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

function getLastDate() {
    return getLastEntry().date;
}

function append(date, change) {
    const lastEntry = getLastEntry();
    const lastDate = lastEntry.date;

    if(change) { // copy last stats to the previous to changes day
        // const nextDate = new Date(date);
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
            // date || new Date(lastDate.getFullYear(), lastDate.getMonth() + 1, 1), // next month's 1st
            date || getRelativeDate(lastDate, 1, 1), // next month's 1st
            lastEntry.debit - change.reduce((acc, val) => acc + val),
            lastEntry.credit1 + change[0],
            lastEntry.credit2 + change[1],
            lastEntry.credit3 + change[2],
            lastEntry.credit4 + change[3],
        )
    );
}

const timeline = computed(() => {
    console.log('here we go!');
    fillPast(pastData);

    // const the24 = findNearestEntry(new Date('2024-06-24'));
    // console.log(the24);
    // const lastDate = getLastDate();
    const lastEntry = getLastEntry();
    const lastDate = lastEntry.date;

    const lastMonthsLastEntry = findNearestEntry(getRelativeDate(lastDate, 0, 0));
    console.log(lastMonthsLastEntry);

    // const changesToAppend = new Map();
    // changesToAppend.set(getRelativeDate(lastDate, 0, 24), [0, 0, -universDebt, 0]);
    // console.log(changesToAppend);
    // changesToAppend.set(getRelativeDate(lastDate, 0, 24), [0, 0, -universDebt, 0]);
    // console.log(changesToAppend);

    const changesToAppend = {};
    const changesToAppend3 = [];

    const universDebt = lastMonthsLastEntry.credit3;
    console.log(universDebt);
    const the24 = getRelativeDate(lastDate, 0, 24)
    append(the24, [0, 0, -universDebt, 0]);

    changesToAppend3[the24.getDate()] = { date: the24, changes: [0, 0, -universDebt, 0] };
    console.log(changesToAppend3);

    // changesToAppend[getRelativeDate(lastDate, 0, 24)] = [0, 0, -universDebt, 0];
    // console.log(changesToAppend);
    

    const monoDebt = lastMonthsLastEntry.credit2;
    console.log(monoDebt);
    const theSecondLast = getRelativeDate(lastDate, 1, -1)
    append(theSecondLast, [0, -monoDebt, 0, 0]);

    if(!changesToAppend3[theSecondLast.getDate()]) {
        changesToAppend3[theSecondLast.getDate()] = [0, -monoDebt, 0, 0];
        // changesToAppend[getRelativeDate(lastDate, 1, -1)][1] = -monoDebt;
    }
    console.log(changesToAppend3);

    changesToAppend3[22] = [1111, 0, 0, 0];
    console.log(changesToAppend3);
    for(const entry of changesToAppend3) {
        if(!entry) continue;
        console.log(entry);
    }
    // for(const entry in changesToAppend.sort()) {
    //     console.log(entry);
    //     console.log(changesToAppend[entry]);
    // }
    // console.log(Array.from(changesToAppend));

    append(); // add the next month's 1st

    const universDebt2 = lastEntry.credit3 - universDebt;
    console.log(universDebt2);
    append(getRelativeDate(lastDate, 1, 24), [0, 0, -universDebt2, 0]);

    const monoDebt2 = lastEntry.credit2 - monoDebt;
    console.log(monoDebt2);
    append(getRelativeDate(lastDate, 2, -1), [0, -monoDebt2, 0, 0]);

    append(); // add the next month's 1st
    return entries;
});

// const timeline = ref(null);
// function generate() {
//     fillPast();
//     append(entries);
//     timeline.value = entries;
// }
// // generate();

// watch(pastData, () => {
//     generate();
// })

export default timeline;
