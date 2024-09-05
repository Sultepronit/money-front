function newDate(input) {
    const date = new Date(input);
    date.setHours(0);
    return date;
}

function getRelativeDate(currentDate, monthShift, day) {
    // console.log(currentDate, monthShift, day);
    return new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + monthShift,
        day
    );
}

function shiftDate(currentDate, dayShift) {
    return new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + dayShift
    );
}

function get29OrFeb(currentDate, shiftMonth = 0) {
    if(currentDate.getMonth() === 1) { // february
        return getRelativeDate(currentDate, 1 + shiftMonth, -1) // 27 or 28
    } else {
        return getRelativeDate(currentDate, shiftMonth, 29);
    }
}

function get30OrFeb(currentDate, shiftMonth) {
    return shiftDate(get29OrFeb(currentDate, shiftMonth), 1);
}

/**
 * the thursday of second last working week
 */
function getTheThursday(currentDate, shiftMonth) { 
    const monthEnd = getRelativeDate(currentDate, shiftMonth + 1, 0);
    const monthEndDay = monthEnd.getDay();
    if(monthEndDay === 0) {
        return getRelativeDate(currentDate, shiftMonth + 1, -10);
    } else {
        return getRelativeDate(currentDate, shiftMonth + 1, -(monthEndDay + 3));
    }
}

const today = {
    value: null,
    update() {
        // console.log('update today!');
        const actual = new Date();
        if(
            actual.getDate() !== this.value?.getDate()
            || actual.getMonth() !== this.value.getMonth()
        ) {
            console.log('It\'s a new day!');
            actual.setHours(0, 0, 0, 0);
            this.value = actual;
        }
    }
};
today.update();

export {
    newDate,
    getRelativeDate,
    shiftDate,
    get29OrFeb,
    get30OrFeb,
    getTheThursday,
    today
};