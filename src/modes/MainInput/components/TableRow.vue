<script setup>
import NormalInput from './NormalInput.vue';
import BalanceInput from './BalanceInput.vue';

defineProps(['content']);
</script>

<template>
<div class="the-row">
    <p>{{ content.date }}</p>
    <!-- <div class="input">
        <input
            type="number"
            :value="content.common.cash.balance"
            @change="content.common.cash.update($event.target.value)"
        >
    </div> -->
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
    grid-template-columns: 4fr 3fr 2fr 1fr;
}
</style>