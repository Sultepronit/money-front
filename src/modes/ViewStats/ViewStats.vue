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
        <p>{{ Math.round(row.stefko.balance) }}</p>
        <p>{{ Math.round(row.stefko.change) }}</p>
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
    grid-template-columns: 4fr 4fr 4fr 4fr 4fr 4fr 4fr 4fr 2fr 2fr;
}
</style>