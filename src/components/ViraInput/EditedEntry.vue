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
            :change="entry.black.balance.change"
            :balance="entry.black.balance.balance"
        />
        <EditCard
            v-show="current === 'black'"
            :income="entry.black.income"
            :account="entry.black.balance"
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
            :change="entry.white.balance.change"
            :balance="entry.white.balance.balance"
        />
        <EditCard
            v-show="current === 'white'"
            :income="entry.white.income"
            :account="entry.white.balance"
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
    font-weight: bold;
    padding-inline: 1em;
}
.account {
    margin-block: 0.2em;
    background: #abf6ff;
}
.edited {
    border: 1px solid black;
    border-radius: 0.2em;
    background-color: white;
}

</style>