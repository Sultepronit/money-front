<script setup>
import MagicInput2 from './MagicInput2.vue';
import PartsInput from './PartsInput.vue';

import { ukrainianDate } from '@/utils/formatters.js';

defineProps(['content']);
</script>

<template>
<div class="the-row">
    <p class="date">{{ ukrainianDate(content.date) }}</p>
    <MagicInput2 :account="content.stefko.credit.account1" />
    <MagicInput2 :account="content.stefko.credit.account2" />
    <MagicInput2 :account="content.stefko.credit.account3" />
    <MagicInput2 :account="content.stefko.credit.account4" />

    <PartsInput :parted="content.stefko.income" />

    <MagicInput2 :account="content.stefko.debitAccounts.account1" />
    <MagicInput2 :account="content.stefko.debitAccounts.account2" />

    <MagicInput2 :account="content.common.cash" />

    <MagicInput2 :account="content.common.usd.balance" />
    <MagicInput2 :account="content.common.usd.rate" />

    <MagicInput2 :account="content.stefko.others.marta" />
</div>
</template>

<style scoped>
.the-row {
    display: grid;
    grid-template-columns: auto 4fr 4fr 4fr 4fr 4fr 4fr 4fr 4fr 2fr 2fr 4fr;
}
.date {
    /* white-space: nowrap; */
    padding-inline: 0.2em;
    width: 7em;
    border: 1px solid;
}
</style>