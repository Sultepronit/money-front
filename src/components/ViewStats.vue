<script setup>
import { data } from '@/services/data.js';
import { ukrainianDate } from '@/utils/formatters';
</script>

<template>
<table>
    <thead>
        <tr>
            <th>date</th>
            <th colspan="2">credit</th>
            <th colspan="2">debit</th>
            <th colspan="2">s balance</th>
            <th colspan="2">v balance</th>
            <th colspan="2">common</th>
            <th colspan="2">balance</th>
            <th>income</th>
            <th>expense</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="row in data" :key="row.date">
            <td>{{ ukrainianDate(row.date) }}</td>
            <td>{{ Math.round(row.stefko.credit.sum) }}</td>
            <td>{{ Math.round(row.stefko.credit.change) }}</td>
            <td>{{ Math.round(row.stefko.debit) }}</td>
            <td>{{ Math.round(row.stefko.debitChange) }}</td>
            <td>{{ Math.round(row.stefko.balance) }}</td>
            <td>{{ Math.round(row.stefko.change) }}</td>
            <td>{{ Math.round(row.vira.balance) }}</td>
            <td>{{ Math.round(row.vira.balanceChange) }}</td>
            <td>{{ Math.round(row.common.balance) }}</td>
            <td>{{ Math.round(row.common.change) }}</td>
            <td>{{ Math.round(row.balance) }}</td>
            <td>{{ Math.round(row.change) }}</td>
            <td>{{ Math.round(row.income.sum) }}</td>
            <td>{{ Math.round(row.change - row.income.sum) }}</td>
        </tr>
    </tbody>
</table>
</template>

<style scoped>
table {
    min-width: 60em;
}
table, tr, th, td {
    border: 1px solid;
    border-collapse: collapse;
}
th, td {
    padding-inline: 0.4em;
    text-align: right;
}

</style>