<script setup>
import CardStats from './CardStats.vue';
import CashStats from './CashStats.vue';
import StatsPattern from './StatsPattern.vue';

const { entry } = defineProps(['date', 'entry']);

</script>

<template>
<div>
    <p>{{ date }}</p>
    <div class="total">
        <StatsPattern
            :income="entry.income"
            :expence="entry.expence"
            :change="entry.change"
            :balance="entry.balance"
        />
    </div>
    <div class="black">
        <CardStats :card="entry.black" />
    </div>
    <div class="white">
        <CardStats :card="entry.white" />
    </div>
    <div class="cash">
        <StatsPattern
            :title="entry.cash.title"
            :income="entry.cash.income.sum"
            :expence="entry.cash.expence.sum"
            :change="entry.cash.change"
        />
    </div>
    <!-- <pre>{{ entry }}</pre> -->

</div>
</template>

<style scoped>
.flex {
    display: flex;
    gap: 1em;
}
</style>