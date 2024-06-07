<script setup>
import { data } from '@/services/data.js';
</script>

<template>
<section >
    <div v-for="row in data" :key="row.date" class="table-row">
        <p>{{ row.date }}</p>
        <p>{{ Math.round(row.stefko.credit.sum) }}</p>
        <p>{{ Math.round(row.stefko.credit.change) }}</p>
        <p>{{ Math.round(row.stefko.debit.sum) }}</p>
        <p>{{ Math.round(row.stefko.debit.change) }}</p>
        <!-- <p>{{ Math.round(row.stefko.balance) }}</p>
        <p>{{ Math.round(row.stefko.change) }}</p> -->
        <p>{{ Math.round(row.vira.balance) }}</p>
        <p>{{ Math.round(row.vira.change) }}</p>
        <p>{{ Math.round(row.balance) }}</p>
        <p>{{ Math.round(row.change) }}</p>
        <p>{{ Math.round(row.income.sum) }}</p>
        <p>{{ Math.round(row.change - row.income.sum) }}</p>
    </div>
</section>
    <pre>{{ data[8].change }}</pre>
    <pre>{{ data[8].stefko.change }}</pre>
    <pre>{{ data[8].stefko.credit }}</pre>
    <pre>{{ data[8].stefko.debit }}</pre>
    <pre>{{ data[8].stefko.balance }}</pre>
    <pre>{{ data[8].stefko }}</pre>
    <pre>{{ data[8] }}</pre>

</template>

<style scoped>
.table-row {
    display: grid;
    grid-template-columns: 5fr 4fr 4fr 4fr 4fr 4fr 4fr 4fr 4fr 4fr 4fr;
}
</style>