<script setup>
// import ViraInput from '@/modes/ViraInput/ViraInput.vue';
import ViraInput from '@/components/ViraInput.vue';
import CompactStats from '@/components/CompactStats.vue';
import ManyStats from './ManyStats.vue';

import { ref } from 'vue';

const mode = ref('vira');

</script>

<template>
<section class="page">
    <div class="the-view">
        <ViraInput v-show="mode === 'vira'" />
        <CompactStats v-show="mode === 'compact'" />
        <ManyStats v-show="mode === 'many'" />
    </div>

    <div class="buttons">
        <button @click="mode='vira'">звіт</button>
        <button @click="mode='compact'">огляд</button>
        <button @click="mode='many'">статистика</button>
    </div>
</section>
</template>

<style scoped>
.page {
    height: calc(100dvh - 0.85rem);
    max-width: 25em;
    margin: 0.3rem;
    display: grid;
    grid-template-rows: 1fr auto;
}
.the-view {
    overflow: auto; 
}
.buttons {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin-block: 0.5rem;
}
button {
    font-size: 1.2rem;
    margin-inline: 0.5em;
    padding-inline: 0.5em;
}
</style>