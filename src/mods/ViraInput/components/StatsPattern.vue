<script setup>
const { card } = defineProps(['title', 'income', 'expence', 'change', 'balance']);
</script>

<template>
    <p>{{ title }}</p>
    <div class="flex">
        <p>+{{ income }}</p>
        <p>-{{ expence }}</p>
        <p>{{ change }}</p>
        <p>{{ balance }}</p>
    </div>
</template>

<style scoped>
.flex {
    display: flex;
    gap: 1em;
}
</style>