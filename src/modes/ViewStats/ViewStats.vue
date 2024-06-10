<script setup>
import { data } from '@/services/data.js';
</script>

<template>
<section>
    <div class="theader table-row">
        <p>date</p>
        <p>credit</p>
        <p></p>
        <p>debit</p>
        <p></p>
        <p>s balance</p>
        <p></p>
        <p>v balance</p>
        <p></p>
        <p>common</p>
        <p></p>
        <p>balance</p>
        <p></p>
        <p>income</p>
        <p>expense</p>
    </div>
    <div v-for="row in data" :key="row.date" class="table-row">
        <p>{{ row.date }}</p>
        <p>{{ Math.round(row.stefko.credit.sum) }}</p>
        <p>{{ Math.round(row.stefko.credit.change) }}</p>
        <p>{{ Math.round(row.stefko.debit) }}</p>
        <p>{{ Math.round(row.stefko.debitChange) }}</p>
        <p>{{ Math.round(row.stefko.balance) }}</p>
        <p>{{ Math.round(row.stefko.change) }}</p>
        <p>{{ Math.round(row.vira.balance) }}</p>
        <p>{{ Math.round(row.vira.balanceChange) }}</p>
        <p>{{ Math.round(row.common.balance) }}</p>
        <p>{{ Math.round(row.common.change) }}</p>
        <p>{{ Math.round(row.balance) }}</p>
        <p>{{ Math.round(row.change) }}</p>
        <p>{{ Math.round(row.income.sum) }}</p>
        <p>{{ Math.round(row.change - row.income.sum) }}</p>
    </div>
</section>
</template>

<style scoped>
.table-row {
    display: grid;
    grid-template-columns: 5fr 4fr 3fr 4fr 3fr 4fr 4fr 4fr 4fr 4fr 4fr 4fr 4fr 4fr 4fr;
}
p {
    text-align: right;
}
</style>