<script setup>
import BalanceChange from './BalanceChange.vue';

import { ref, computed } from 'vue';
import { reversed as list } from '@/services/data.js';
import { ukrainianDate } from '@/utils/formatters';

const selected = ref(0);
</script>

<template>
<section class="the-body">
    <div class="detailed-stats">
        <p class="title-date">{{ ukrainianDate(list[selected].date) }}</p>
        <div class="stats-item">
            <p>Веронічка</p>
            <p class="number">{{ list[selected].vira.balance }}</p>
            <!-- <p class="number">{{ list[selected].vira.balanceChange }}</p> -->
            <BalanceChange :value="list[selected].vira.balanceChange" />
        </div>
        <div class="stats-item">
            <p>Батько</p>
            <p class="number">{{ Math.round(list[selected].stefko.balance) }}</p>
            <!-- <p class="number">{{ Math.round(list[selected].stefko.change) }}</p> -->
            <BalanceChange :value="list[selected].stefko.change" />
        </div>
        <div class="stats-item">
            <p>готівка</p>
            <p class="number">{{ list[selected].common.cash.balance }}</p>
            <!-- <p class="number">{{ list[selected].common.cash.change }}</p> -->
            <BalanceChange :value="list[selected].common.cash.change" />
        </div>
        <div class="stats-item">
            <p>USD</p>
            <p class="number">{{ list[selected].common.usd.balance.balance }} / {{ list[selected].common.usd.uah }}</p>
            <!-- <p class="number">{{ list[selected].common.usd.change }}</p> -->
            <BalanceChange :value="list[selected].common.usd.change" />
        </div>
        <div class="stats-item">
            <p>баланс</p>
            <p class="number">{{ Math.round(list[selected].balance) }} </p>
            <!-- <p class="number">{{ Math.round(list[selected].change) }}</p> -->
            <BalanceChange :value="list[selected].change" />
        </div>
        <div class="stats-item">
            <p>доходи</p>
            <p></p>
            <!-- <p class="number">{{ list[selected].income.sum }}</p> -->
            <BalanceChange :value="list[selected].income.sum" />
        </div>
        <div class="stats-item">
            <p>розходи</p>
            <p></p>
            <!-- <p class="number">{{ Math.round(list[selected].change - list[selected].income.sum) }}</p> -->
            <BalanceChange :value="list[selected].change - list[selected].income.sum" />
        </div>
    </div>
    
    <div class="list">
        <div
            v-for="(day, index) in list"
            :key="index"
            class="list-item"
            :class="{selected: selected === index}"
            @click="selected = index"
        >
            <p>{{ ukrainianDate(day.date) }}</p>
            <p class="number">{{ Math.round(day.balance) }} </p>
            <!-- <p class="number">{{ Math.round(day.change) }}</p> -->
            <BalanceChange :value="day.change" />
        </div>
    </div>
</section>
</template>

<style scoped>
.the-body {
    max-width: 20em;
    margin: 0.3rem;
}
.title-date {
    text-align: center;
    font-size: 1.2em;
    font-weight: bold;
}
.stats-item {
    display: grid;
    grid-template-columns: 6fr 5fr 4fr;
    background: #abf6ff;
    margin: 0.2em;
    padding-inline: 0.2em;
}
.number {
    text-align: right;
}
.list {
    margin-top: 0.7rem;
    height: calc(100vh - 13.8em);
    overflow: auto;
}
.list-item {
    display: grid;
    grid-template-columns: 6fr 5fr 4fr;
    margin: 0.4rem 0.1rem;
    padding: 0.3em;
    border-radius: 0.4rem;
    background-color: #ebeaea;
}
.selected {
    background-color: #b5ffb5;
}
</style>