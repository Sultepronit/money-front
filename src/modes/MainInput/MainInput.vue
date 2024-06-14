<script setup>
import TableRow from './components/TableRow.vue';
import { data } from '@/services/data.js';
</script>

<template>
<section class="main-input">
    <div class="main-input-row">
        <p class="date">date</p>
        <p>pumb</p>
        <p>mono</p>
        <p>univers</p>
        <p>more</p>
        <p>s income</p>
        <p>transfer</p>
        <p>pumb</p>
        <p>zp</p>
        <p>cash</p>
        <p>usd</p>
        <p>rate</p>
        <p>m</p>
    </div>
    <TableRow v-for="row in data" :key="row.date" :content="row" />
</section>
</template>

<style scoped>
.main-input {
    min-width: 60em;
}
/* .thead {
    display: grid;
    grid-template-columns: auto 4fr 4fr 4fr 4fr 4fr 4fr 4fr 4fr 4fr 2fr 2fr 4fr;
} */
.thead p {
    text-align: center;
    border: 1px solid;
}
.date {
    /* white-space: nowrap; */
    padding-inline: 0.2em;
    width: 7em;
    border: 1px solid;
}
</style>