<script setup>
import FutureChart from '@/components/FutureChart.vue';
import BalanceChart from './BalanceChart.vue';
</script>

<template>
<section>
    <BalanceChart />
    <hr>
    <FutureChart :details="true"  />
</section>
</template>

<style scoped>
</style>