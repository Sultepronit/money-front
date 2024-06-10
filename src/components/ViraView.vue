<script setup>
import ViraInput from '@/modes/ViraInput/ViraInput.vue';
import Chart1 from '@/modes/Chart1/Chart1.vue';
import MainInput from '@/modes/MainInput/MainInput.vue';
import ViewStats from '@/modes/ViewStats/ViewStats.vue';
import CompactStats from '@/components/CompactStats.vue';

import { onMounted, ref } from 'vue';

const page = ref(null);
console.log(page);
console.log(page.value);
const mode = ref('vira');

onMounted(() => {
    console.log(page.value);
    console.log(page.value.style);
    console.log(page.value.style.height);
    setTimeout(() => {
        // page.value.style.height = '500px';
    }, 1000);   
    
});

</script>

<template>
<section class="main-page" ref="page">
    <div>
        <ViraInput v-show="mode === 'vira'" />
        <CompactStats v-show="mode === 'compact'" />
    </div>

    <div class="buttons">
        <button @click="mode='vira'">звіт</button>
        <button @click="mode='compact'">огляд</button>
    </div>
</section>
</template>

<style scoped>
.main-page {
    /* height: 90dvh; */
    display: grid;
    grid-template-rows: 1fr auto;
}
.buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-bottom: 0.5em;
}
button {
    font-size: 1.2rem;
    margin-inline: 0.5em;
    padding-inline: 0.5em;
}
</style>