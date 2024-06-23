<script setup>
import MagicInput2 from './MagicInput2.vue';
import PartsInput from './PartsInput.vue';

import { ukrainianDate } from '@/utils/formatters.js';

defineProps(['content']);
</script>

<template>
<div class="main-input-row">
    <p class="date">{{ ukrainianDate(content.date) }}</p>
    <MagicInput2 :account="content.stefko.credit.account1" />
    <MagicInput2 :account="content.stefko.credit.account2" />
    <MagicInput2 :account="content.stefko.credit.account3" />
    <MagicInput2 :account="content.stefko.credit.account4" />

    <PartsInput :parted="content.stefko.income" />
    <PartsInput :parted="content.additionalIncome.debit" />
    <PartsInput :parted="content.additionalIncome.cancel" />

    <MagicInput2 :account="content.stefko.debitAccounts.account1" />
    <MagicInput2 :account="content.stefko.debitAccounts.account2" />

    <MagicInput2 :account="content.common.cash" />

    <MagicInput2 :account="content.common.usd.balance" />
    <MagicInput2 :account="content.common.usd.rate" />

    <MagicInput2 :account="content.stefko.others.marta" />
</div>
</template>

<style scoped>
.date {
    /* white-space: nowrap; */
    padding-inline: 0.2em;
    width: 7em;
    border: 1px solid;
}
</style>