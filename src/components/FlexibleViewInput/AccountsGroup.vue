<script setup>
import MagicInput from '@/components/FlexibleViewInput/MagicInput.vue';
import PartsInput from '@/components/FlexibleViewInput/PartsInput.vue';

defineProps(['title', 'balances', 'parts']);
</script>

<template>
<div class="accounts">
    <p class="center">{{ title }}</p>
    <div class="account" v-for="item in balances">
        <p>{{ item.name }}</p>
        <MagicInput :account="item.account" />
    </div>

    <div class="account" v-for="item in parts">
        <p>{{ item.name }}</p>
        <PartsInput :parted="item.account" />
    </div>
</div>
</template>

<style scoped>
.accounts {
    width: 15em;
    margin: 0.2em;
    padding: 0.2em;
    border: 1px solid gray;
}
.account {
    /* display: flex; */
    display: grid;
    grid-template-columns: 4em 1fr;
}
</style>