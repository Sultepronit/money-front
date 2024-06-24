<script setup>
import FlexibleInput from '@/components/FlexibleViewInput/FlexibleInput.vue';
import FlexibleList from '@/components/FlexibleViewInput/FlexibleList.vue';

import { reversed as data } from '@/services/data.js';
import { ukrainianDate } from '@/utils/formatters';

const selected = data.value[0];
</script>

<template>
<section class="main-area">
    <FlexibleInput :edited="selected" class="half" />
    <hr>
    <FlexibleList :data="data" class="half" />
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