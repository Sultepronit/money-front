<script setup>
import StatsPattern from './StatsPattern.vue';
import EditCard from './EditCard.vue';
import EditCash from './EditCash.vue';

import { ref } from 'vue';

const { entry } = defineProps(['date', 'entry', 'index']);

const current = ref('black');

</script>

<template>
<section class="the-entry">
    <div class="header">
        <p class="date">{{ date }}</p>
        <div class="total">
            <StatsPattern
                :income="entry.income"
                :expense="entry.expense"
                :change="entry.change"
                :balance="entry.balance"
            />
        </div>
    </div>

    <div class="account black" @click="current='black'">
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
    <div class="account white"  @click="current='white'">
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
    <div class="account cash"  @click="current='cash'">
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
    <!-- <pre>{{ entry }}</pre> -->

</section>
</template>

<style scoped>
.the-entry {
    margin: 0.1rem;
    padding: 0.1rem;
    /* border: 2px solid blue; */
}
.header {
    /* margin-bottom: 0.2em; */
    /* background-color: khaki; */
}
.date {
    font-size: 1.1em;
    text-align: center;
    color: blue;
    font-weight: bold;
    padding-inline: 1em;
}
.account {
    /* padding-top: 0.2em; */
    margin-bottom: 0.2em;
    /* border-top: 2px solid gray; */
    border: 1px solid gray;
    border-radius: 0.2em;
}
</style>