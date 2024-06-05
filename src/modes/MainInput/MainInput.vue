<script setup>
import TableRow from './components/TableRow.vue';
import { data } from '@/services/data.js';
</script>

<template>
    <TableRow v-for="row in data" :key="row.date" :content="row" />
    <!-- <pre>{{ data }}</pre>     -->
</template>