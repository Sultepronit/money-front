<script setup>
import FlexibleInput from '@/components/FlexibleViewInput/FlexibleInput.vue';
import FlexibleList from '@/components/FlexibleViewInput/FlexibleList.vue';

import { ref } from 'vue';
import { reversed as data } from '@/services/data.js';

const selected = ref(0);
function select(index) {
    selected.value = index;
}
</script>

<template>
<section class="main-area">
    <FlexibleInput
        :edited="data[selected]"
        class="half"
    />
    <hr>
    <FlexibleList
        :data="data"
        :selected="selected"
        :select="select"
        class="half"
    />
</section>
</template>

<style scoped>
.main-area {
    height: calc(95dvh - 1.1rem);
    display: grid;
}

.half {
    overflow: auto;
}
</style>