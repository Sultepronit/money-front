<script setup>
// import BalanceInput from './BalanceInput.vue';
import MagicInput from './MagicInput.vue';
import MagicInput2 from './MagicInput2.vue';

import { ukrainianDate } from '@/utils/formatters.js';

defineProps(['content']);
</script>

<template>
<div class="the-row">
    <p class="date">{{ ukrainianDate(content.date) }}</p>
    <MagicInput :account="content.stefko.credit.account1" />
    <MagicInput :account="content.stefko.credit.account2" />
    <MagicInput :account="content.stefko.credit.account3" />
    <MagicInput :account="content.stefko.credit.account4" />

    <MagicInput2 :account="content.stefko.debit.account1" />
    <MagicInput2 :account="content.stefko.debit.account2" />

    <MagicInput2 :account="content.common.cash" />

    <MagicInput2 :account="content.common.usd.balance" />
    <MagicInput2 :account="content.common.usd.rate" />

    <!-- <div class="input">
        <input
            type="number"
            :value="content.common.usd.balance"
            @change="content.common.usd.updateBalance($event.target.value)"
        >
    </div> -->

    <!-- <input
        type="number"
        :value="content.common.usd.rate"
        @change="content.common.usd.updateRate($event.target.value)"
    > -->
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