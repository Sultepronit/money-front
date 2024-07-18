<script setup>
import BalanceChange from '@/components/BalanceChange.vue';
import BigNumber from '@/components/BigNumber.vue';

import { ukrainianDate } from '@/utils/formatters';

defineProps(['data', 'selected', 'select']);
</script>

<template>
<section>
    <div
        v-for="(row, index) in data"
        :key="index"
        @click="select(index)"
        class="list-item"
        :class="{selected: selected === index}"
    >
        <p class="date">{{ ukrainianDate(row.date) }}</p>

        <div class="plate" title="balance">
            <BigNumber :value="row.balance" />
            <BalanceChange :value="row.change" />
        </div>

        <div class="plate" title="income/expense">
            <BalanceChange :value="row.income" />
            <BalanceChange :value="row.expense" />
        </div>

        <div class="plate" title="my credit">
            <BigNumber :value="row.stefko.credit.sum" />
            <BalanceChange :value="row.stefko.credit.change" />
        </div>

        <div class="plate" title="my deibt">
            <BigNumber :value="row.stefko.debit" />
            <BalanceChange :value="row.stefko.debitChange" />
        </div>

        <div class="plate" title="Vira balance">
            <BigNumber :value="row.vira.balance" />
            <BalanceChange :value="row.vira.balanceChange" />
        </div>

        <div class="plate" title="common balance">
            <BigNumber :value="row.common.balance" />
            <BalanceChange :value="row.common.change" />
        </div>
    </div>
</section>
</template>

<style scoped>
.list-item {
    display: flex;
    gap: 1em;
    flex-wrap: wrap;
    /* justify-content: space-between; */
    justify-content: space-around;
    align-items: center;
    height: 2.7em;
    overflow: hidden;
    width: fit-content;
    margin: 0.4rem auto;
    /* margin-inline: auto; */
    background: #f1f1f1;
    padding-inline: 0.2em;
    /* display: grid;
    grid-template
    gap: 1em; */
}

.selected {
    background: rgb(172, 255, 154);
}

.date {
    width: 6em;
    /* background: rgb(172, 255, 154); */
}

.plate {
    height: 2.7em;
    /* background: rgb(172, 255, 154); */
    width: 4em;
}
</style>