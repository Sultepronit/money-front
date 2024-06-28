<script setup>
import BalanceChange from './BalanceChange.vue';
import BigNumber from './BigNumber.vue';

import { ref, computed } from 'vue';
import { reversed as list } from '@/services/data.js';
import { ukrainianDate } from '@/utils/formatters';

const selected = ref(0);
</script>

<template>
<section class="block">
    <div class="detailed-stats">
        <p class="title-date">{{ ukrainianDate(list[selected].date) }}</p>

        <div class="stats-item columns">
            <p>Веронічка</p>
            <BigNumber :value="list[selected].vira.balance" />
            <BalanceChange :value="list[selected].vira.balanceChange" />
        </div>

        <div class="stats-item columns">
            <p>Батько</p>
            <BigNumber :value="list[selected].stefko.balance" />
            <BalanceChange :value="list[selected].stefko.change" />
        </div>

        <div class="stats-item columns">
            <p>готівка</p>
            <BigNumber :value="list[selected].common.cash.balance" />
            <BalanceChange :value="list[selected].common.cash.change" />
        </div>

        <div class="stats-item columns">
            <p class="usd-title">
                <p>USD</p>
                <p class="rate">&nbsp;{{ list[selected].common.usd.rate.balance.toFixed(2) }}</p>
            </p>
            <div class="usd">
                <p>{{ list[selected].common.usd.balance.balance }} /&nbsp;</p>
                <BigNumber :value="list[selected].common.usd.uah" />
            </div>
            <BalanceChange :value="list[selected].common.usd.change" />
        </div>

        <div class="stats-item columns">
            <p>баланс</p>
            <BigNumber :value="list[selected].balance" />
            <BalanceChange :value="list[selected].change" />
        </div>

        <div class="stats-item columns">
            <p>доходи</p>
            <p></p>
            <BalanceChange :value="list[selected].income" />
        </div>

        <div class="stats-item columns">
            <p>розходи</p>
            <p></p>
            <BalanceChange :value="list[selected].expense" />
        </div>
    </div>
    
    <div class="list">
        <div
            v-for="(day, index) in list"
            :key="index"
            class="list-item columns"
            :class="{selected: selected === index}"
            @click="selected = index"
        >
            <p>{{ ukrainianDate(day.date) }}</p>
            <BigNumber :value="day.balance" />
            <BalanceChange :value="day.change" />
        </div>
    </div>
</section>
</template>

<style scoped>
.block {
    max-width: 25em;
    margin: auto;
}
.title-date {
    text-align: center;
    font-size: 1.2em;
    font-weight: bold;
}
.columns {
    display: grid;
    grid-template-columns: 6fr 5fr 4fr;
}
.stats-item {
    background: #abf6ff;
    margin: 0.2em;
    padding-inline: 0.2em;
}
.usd-title {
    display: flex;
}
.rate {
    color: blue;
    font-size: 0.75em;
    /* font-weight: bold; */
}
.usd {
    display: flex;
    justify-content: end;
}
.list {
    margin-top: 0.7rem;
    height: calc(100dvh - 15.9em);
    overflow: auto;
}
.list-item {
    margin: 0.4rem 0.1rem;
    padding: 0.3em;
    border-radius: 0.4rem;
    background-color: #ebeaea;
}
.selected {
    background-color: #b5ffb5;
}
</style>