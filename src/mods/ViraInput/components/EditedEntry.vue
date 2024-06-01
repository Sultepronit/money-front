<script setup>
import CardStats from './CardStats.vue';
import StatsPattern from './StatsPattern.vue';
import EditCard from './EditCard.vue';
import EditCard2 from './EditCard2.vue';

const { entry } = defineProps(['date', 'entry', 'index']);

</script>

<template>
<section class="the-entry">
    <div class="header">
        <p class="date">{{ date }}</p>
        <div class="total">
            <StatsPattern
                :income="entry?.income"
                :expence="entry.expence"
                :change="entry.change"
                :balance="entry.balance"
            />
        </div>
    </div>

    <div class="account black">
        <StatsPattern
            title="чорна"
            :income="entry.black.income.sum"
            :expence="entry.black.expence"
            :change="entry.black.change"
            :balance="entry.black.balance"
        />
        <EditCard
            :index="index"
            cardName="black"
        />
    </div>
    <div class="account white">
        <CardStats :card="entry.white" />
        <EditCard2
            :income="entry.white.income"
            :index="index"
            cardName="white"
        />
    </div>
    <div class="account cash">
        <StatsPattern
            :title="entry.cash.title"
            :income="entry.cash.income.sum"
            :expence="entry.cash.expence.sum"
            :change="entry.cash.change"
        />
    </div>
    <!-- <pre>{{ entry }}</pre> -->

</section>
</template>

<style scoped>
.the-entry {
    margin: 0.1rem;
    padding: 0.1rem;
    border: 2px solid blue;
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
    /* margin-bottom: 0.2em; */
    border-top: 2px solid gray;
}
</style>