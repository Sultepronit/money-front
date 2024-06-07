<script setup>
import TableRow from './components/TableRow.vue';
import { data } from '@/services/data.js';
</script>

<template>
    <TableRow v-for="row in data" :key="row.date" :content="row" />
    <!-- <p v-for="row in data" :key="row.date">{{ row.common.usd.balance.change }}</p> -->
     <!-- <p v-for="row in data" :key="row.date">{{ row.common.usd.change }}</p> -->
      <p v-for="row in data" :key="row.date">{{ row.change }}</p>
</template>