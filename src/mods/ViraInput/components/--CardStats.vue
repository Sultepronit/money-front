<script setup>
import StatsPattern from './StatsPattern.vue';
import { computed } from 'vue';
const { card } = defineProps(['card']);

</script>

<template>
    <StatsPattern
        :title="card.title"
        :income="card.income.sum"
        :expence="card.expence"
        :change="card.change"
        :balance="card.balance"
    />
</template>

<style scoped>
.flex {
    display: flex;
    gap: 1em;
}
</style>