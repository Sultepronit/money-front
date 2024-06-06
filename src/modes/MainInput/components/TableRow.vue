<script setup>
import BalanceInput from './BalanceInput.vue';
import MagicInput from './MagicInput.vue';

defineProps(['content']);
</script>

<template>
<div class="the-row">
    <p>{{ content.date }}</p>
    <MagicInput :account="content.stefko.credit.account1" />
    <BalanceInput :account="content.stefko.credit.account1" />
    <BalanceInput :account="content.stefko.credit.account2" />
    <BalanceInput :account="content.stefko.credit.account3" />
    <BalanceInput :account="content.stefko.credit.account4" />

    <BalanceInput :account="content.common.cash" />

    <div class="input">
        <input
            type="number"
            :value="content.common.usd.balance"
            @change="content.common.usd.updateBalance($event.target.value)"
        >
    </div>

    <input
        type="number"
        :value="content.common.usd.rate"
        @change="content.common.usd.updateRate($event.target.value)"
    >
</div>
</template>

<style scoped>
.the-row {
    display: grid;
    grid-template-columns: 4fr 5fr 3fr 3fr 3fr 3fr 3fr 2fr 1fr;
}
</style>