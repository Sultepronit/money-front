<script setup>
defineProps(['title', 'income', 'expense', 'change', 'balance']);
</script>

<template>
    <p class="title">{{ title }}</p>
    <div class="the-stats">
        <p class="column income">+{{ income }}</p>
        <p class="column expense">-{{ expense }}</p>
        <p class="column">{{ change }}</p>
        <p class="column balance">{{ balance }}</p>
    </div>
</template>

<style scoped>
.title {
    text-align: center;
    /* font-weight: bold; */
    font-style: italic;
    padding-inline: 1em;
}
.the-stats {
    padding-inline: 0.3em;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
}
.column {
    /* width: 20%; */
    text-align: right;
    /* padding-right: 1em; */
    /* background: yellow; */
}
</style>