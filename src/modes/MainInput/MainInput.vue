<script setup>
import ViewStats from '@/modes/ViewStats/ViewStats.vue';

import TableRow from './components/TableRow.vue';
import { data } from '@/services/data.js';
</script>

<template>
<section>
    <TableRow v-for="row in data" :key="row.date" :content="row" />

    <ViewStats />
</section>
</template>