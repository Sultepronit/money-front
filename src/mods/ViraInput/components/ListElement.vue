<script setup>
import StatsPattern from './StatsPattern.vue';

import { ukrainianDate } from '@/utils/formatters.js';

const { entry } = defineProps(['date', 'entry']);

</script>

<template>
<div>
    <p class="date">{{ ukrainianDate(date) }}</p>
    <StatsPattern
        :income="entry.income"
        :expense="entry.expense"
        :change="entry.change"
        :balance="entry.balance"
    />
</div>
</template>

<style scoped>
.date {
    text-align: center;
    color: blue;
    /* font-weight: bold; */
    padding-inline: 1em;
}
.flex {
    display: flex;
    gap: 1em;
}
</style>