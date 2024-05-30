import { receiveData } from './api.js';
// import 

function fillTheNull(data) {
    const fillable = [
        'vira_black',
        'vira_white'
    ];
    let previous = null;
    for(const row of data) {
        for(const column of fillable) {
            if(row[column] === null) {
                row[column] = previous[column];
            }
        }
        // if(!row.vira_black) {
        //     row.vira_black = previous.vira_black;
        // }
        previous = row;
    }
}

const parsedDataRow = {
    date: '',
    vira: {
        black: {
            balance: 0,
            incomeParts: [],
            income: 0,
            expence: 0,
        },
        white: {
            balance: 0,
            incomeParts: [],
            income: 0,
            expence: 0,
        },
        cach: {
            incomeParts: [],
            income: 0,
            expenceparts: [],
            expence: 0,
        },
        total: {
            cardsBalance: 0,
            income: 0,
            expence: 0,
        }
    }
}

async function doThings() {
    const data = await receiveData();
    console.log(data);
    fillTheNull(data);
    console.log(data);
}

export { doThings };