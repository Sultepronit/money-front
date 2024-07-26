// import { reversed } from '@/services/data.js';

const pastMonths = [
    { date: '2024-01-01', income: 39400, expense: -37308 },
    { date: '2024-02-01', income: 27950, expense: -36289 },
    { date: '2024-03-01', income: 50560, expense: -36602 },
    { date: '2024-04-01', income: 36220, expense: -39916 },
    { date: '2024-05-01', income: 46140, expense: -45085 },
];

function splitMonths(reversed, limit) {
    const months = [[]];
    let monthIndex = 0;
    for(const entry of reversed) {
        months[monthIndex].push(entry); // add day to month
        if((new Date(entry.date)).getDate() === 1) { // start new month with the 1st day
            months[++monthIndex] = [];
        }

        if(limit && monthIndex > limit) break;
    }
    // console.log(months);
    months.pop(); // 1st day wich the reversed data ends with creates empty month

    if(months[0].length < 20) {
        months.shift(); // remove the last month if it's too short
    }

    months.reverse();

    return months;
}

function sumIncomeExpense(period) {
    // console.log(period);
    const result = {
        income: 0,
        expense: 0,
        date: period[period.length - 1].date
    };

    for(const row of period) {
        result.income += row.income;
        result.expense += row.expense;
    }

    return result;
}

function prepareMonths(reversed) {
    const months = splitMonths(reversed);
    console.log(months);
    const totals = months.map(month => sumIncomeExpense(month));
    // console.log(totals);
    return [
        ...pastMonths,
        ...totals
    ]
}

export { prepareMonths };