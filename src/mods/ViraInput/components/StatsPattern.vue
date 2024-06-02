<script setup>
defineProps(['title', 'income', 'expence', 'change', 'balance']);
</script>

<template>
    <p class="title">{{ title }}</p>
    <div class="flex">
        <p class="column income">+{{ income }}</p>
        <p class="column expence">-{{ expence }}</p>
        <p class="column">{{ change }}</p>
        <p class="column balance">{{ balance }}</p>
    </div>
</template>

<style scoped>
.title {
    text-align: center;
    font-weight: bold;
    padding-inline: 1em;
}
.flex {
    display: flex;
    gap: 1em;
}
.column {
    width: 20%;
    text-align: right;
    padding-right: 1em;
    /* background: yellow; */
}
.income {
    color: green;
}
.expence {
    color: red;
}
.balance {
    font-weight: bold;
}
</style>