<script setup>
import StatsPattern from './StatsPattern.vue';
import EditCard from './EditCard.vue';
import EditCash from './EditCash.vue';

import { ref } from 'vue';

import { ukrainianDate } from '@/utils/formatters.js';

defineProps(['date', 'entry', 'index']);

const current = ref('black');

</script>

<template>
<section class="the-entry">
    <div class="header">
        <p class="date">{{ ukrainianDate(date) }}</p>
        <div class="account">
            <StatsPattern
                :income="entry.income"
                :expense="entry.expense"
                :change="entry.change"
                :balance="entry.balance"
            />
        </div>
    </div>

    <div
        class="account black"
        :class="{edited: current === 'black'}"
        @click="current='black'"
    >
        <StatsPattern
            title="чорна"
            :income="entry.black.income.sum"
            :expense="entry.black.expense"
            :change="entry.black.change"
            :balance="entry.black.balance"
        />
        <EditCard
            v-show="current === 'black'"
            :income="entry.black.income"
            :index="index"
            cardName="black"
        />
    </div>
    <div
        class="account white" 
        :class="{edited: current === 'white'}"
        @click="current='white'"
    >
        <StatsPattern
            title="біла"
            :income="entry.white.income.sum"
            :expense="entry.white.expense"
            :change="entry.white.change"
            :balance="entry.white.balance"
        />
        <EditCard
            v-show="current === 'white'"
            :income="entry.white.income"
            :index="index"
            cardName="white"
        />
    </div>
    <div
        class="account cash"
        :class="{edited: current === 'cash'}"
        @click="current='cash'"
    >
        <StatsPattern
            title="готівка"
            :income="entry.cash.income.sum"
            :expense="entry.cash.expense.sum"
            :change="entry.cash.change"
        />
        <EditCash
            v-show="current === 'cash'"
            :income="entry.cash.income"
            :expense="entry.cash.expense"
        />
    </div>

</section>
</template>

<style scoped>
.the-entry {
    margin-bottom: 0.5em;
}
.date {
    font-size: 1.2em;
    text-align: center;
    /* color: blue; */
    font-weight: bold;
    padding-inline: 1em;
}
/* .total {
    background: #abf6ff;
} */
.account {
    margin-block: 0.2em;
    /* border: 1px solid gray; */
    /* border-radius: 0.2em; */
    background: #abf6ff;
    /* background: #d6f4f8; */
}
.edited {
    /* border-color: green;
    border-width: 2px; */
    /* border: 1px solid black; */
}

</style>