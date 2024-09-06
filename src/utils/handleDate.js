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

function getToday() {
    const result = new Date();
    result.setHours(0, 0, 0, 0);
    return result;
}

function get_yyyy_mm_dd(date) {
    const mutatedDate = new Date(date);
    mutatedDate.setHours(0, -date.getTimezoneOffset());
    return JSON.stringify(mutatedDate).slice(1, 11);
}

export {
    newDate,
    getRelativeDate,
    shiftDate,
    get29OrFeb,
    get30OrFeb,
    getTheThursday,
    getToday,
    get_yyyy_mm_dd
};