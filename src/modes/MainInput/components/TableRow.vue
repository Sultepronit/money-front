<script setup>
// import MagicInput from './MagicInput.vue';
import MagicInput2 from './MagicInput2.vue';

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

    <MagicInput2 :account="content.stefko.debit.account1" />
    <MagicInput2 :account="content.stefko.debit.account2" />

    <MagicInput2 :account="content.common.cash" />

    <MagicInput2 :account="content.common.usd.balance" />
    <MagicInput2 :account="content.common.usd.rate" />
</div>
</template>

<style scoped>
.the-row {
    display: grid;
    grid-template-columns: auto 4fr 4fr 4fr 4fr 4fr 4fr 4fr 2fr 2fr;
}
.date {
    padding-inline: 0.2em;
    width: 6em;
    border: 1px solid;
}
</style>