<script setup>
import MagicInput from '@/components/FlexibleViewInput/MagicInput.vue';

import { ukrainianDate } from '@/utils/formatters';

defineProps(['data']);
</script>

<template>
<section>
    <div
        v-for="(row, index) in data"
        :key="index"
        class="list-item"
    >
        <p class="plate">{{ row.date }}</p>

        <div class="plate">
            <p>{{ row.balance }}</p>
            <p>{{ row.change }}</p>
        </div>

        <div class="plate">
            <p>{{ row.income }}</p>
            <p>{{ row.expense }}</p>
        </div>

        <div class="plate">
            <p>{{ Math.round(row.stefko.credit.sum) }}</p>
            <p>{{ Math.round(row.stefko.credit.change) }}</p>
        </div>

        <div class="plate">
            <p>{{ Math.round(row.stefko.debit) }}</p>
            <p>{{ Math.round(row.stefko.debitChange) }}</p>
        </div>

    </div>
</section>
</template>

<style scoped>
.list-item {
    display: flex;
    gap: 1em;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    height: 2.5em;
    overflow: hidden;
    margin: 0.4rem;
    background: rgb(172, 255, 154);
    /* display: grid;
    grid-template
    gap: 1em; */
}

.plate {
    /* background: rgb(172, 255, 154); */
    width: 5em;
}
</style>