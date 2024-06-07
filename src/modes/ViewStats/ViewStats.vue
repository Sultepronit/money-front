<script setup>
import { data } from '@/services/data.js';
</script>

<template>
    <pre>{{ data[8].change }}</pre>
    <pre>{{ data[8].stefko.change }}</pre>
    <pre>{{ data[8].stefko.credit }}</pre>
    <pre>{{ data[8].stefko.debit }}</pre>
    <pre>{{ data[8].stefko.balance }}</pre>
    <pre>{{ data[8].stefko }}</pre>
    <pre>{{ data[8] }}</pre>
</template>