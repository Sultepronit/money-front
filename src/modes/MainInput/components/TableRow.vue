<script setup>
defineProps(['content']);
</script>

<template>
    <p>{{ content.date }}</p>
    <input
        type="number"
        :value="content.common.cash.balance"
        @change="content.common.cash.update($event.target.value)"
    >
    <input
        type="number"
        :value="content.common.usd.balance"
        @change="content.common.usd.updateBalance($event.target.value)"
    >
    <input
        type="number"
        :value="content.common.usd.rate"
        @change="content.common.usd.updateRate($event.target.value)"
    >
    <pre>{{ content.common }}</pre>
    <pre>{{ content.common.change }}</pre>
    <pre>{{ content.common.balance }}</pre>
    <pre>{{ content.balance }}</pre>
    <!-- <pre>{{ content.common.usd }}</pre>
    <pre>{{ content.common.cash }}</pre>
    <pre>{{ content.common.cash.change }}</pre> -->
    
</template>