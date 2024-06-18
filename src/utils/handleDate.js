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

export { newDate, getRelativeDate };