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

function parseData(data) {
    return data.map(row => {
        return {
            date: row.date,
            vira: {
                black: {
                    balance: row.vira_black,
                    incomeParts: JSON.parse(row.vira_black_income) || []
                },
                white: {
                    balance: row.vira_white,
                    incomeParts: JSON.parse(row.vira_white_income) || []
                },
                cash: {
                    incomeParts: JSON.parse(row.vira_cash_income) || [],
                    expenceParts: JSON.parse(row.vira_cash_expence) || []
                }
            }
        };
    });
}

async function doThings() {
    const data = await receiveData();
    console.log(data);
    fillTheNull(data);
    console.log(data);
    console.log(parseData(data));
}

export { doThings };