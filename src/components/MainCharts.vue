<script setup>
import FutureChart from '@/components/FutureChart.vue';
import BalanceChart from './BalanceChart.vue';
import StefkoChart from './StefkoChart.vue';
import RatesChart from './RatesChart.vue';
</script>

<template>
<section>
    <BalanceChart />
    <hr>
    <StefkoChart />
    <hr>
    <FutureChart />
    <hr>
    <RatesChart />
</section>
</template>

<style scoped>
</style>