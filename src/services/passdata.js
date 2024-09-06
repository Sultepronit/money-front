let goPast = 50;
const passdata = {};

function chosePassdata(dbContent) {
    const theEntry = dbContent[dbContent.length - goPast];
    // console.log(theEntry.date);

    for(const colName in theEntry) {
        if(colName === 'date') continue;
        if(String(theEntry[colName]).length > 6) {
            passdata.date = theEntry.date;
            passdata.column = colName;
            passdata.value = theEntry[colName];
            break;
        }
    }

    // console.log(passdata);
    if(!passdata.date) {
        goPast++;
        chosePassdata(dbContent);
    }
}

export { passdata, chosePassdata };