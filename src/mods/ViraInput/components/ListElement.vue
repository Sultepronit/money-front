<script setup>
import CardStats from './CardStats.vue';
import CashStats from './CashStats.vue';
import StatsPattern from './StatsPattern.vue';

const { entry } = defineProps(['date', 'entry']);

</script>

<template>
<div>
    <p class="date">{{ date }}</p>
    <StatsPattern
        :income="entry.income"
        :expence="entry.expence"
        :change="entry.change"
        :balance="entry.balance"
    />
</div>
</template>

<style scoped>
.date {
    /* text-align: center; */
    color: blue;
    font-weight: bold;
}
.flex {
    display: flex;
    gap: 1em;
}
</style>