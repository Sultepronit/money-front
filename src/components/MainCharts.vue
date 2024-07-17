<script setup>
import FutureChart from '@/components/FutureChart.vue';
import BalanceChart from './BalanceChart.vue';
import StefkoChart from './StefkoChart.vue';
</script>

<template>
<section>
    <BalanceChart />
    <hr>
    <StefkoChart />
    <hr>
    <FutureChart :details="true"  />
</section>
</template>

<style scoped>
</style>