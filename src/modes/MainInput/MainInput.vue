<script setup>
import ViewStats from '@/components/ViewStats.vue';

import TableRow from './components/TableRow.vue';
import { data } from '@/services/data.js';
</script>

<template>
<section class="main-input">
    <TableRow v-for="row in data" :key="row.date" :content="row" />

    <ViewStats />
</section>
</template>

<style scoped>
.main-input {
    min-width: 60em;
}
</style>