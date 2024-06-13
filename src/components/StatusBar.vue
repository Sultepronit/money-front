<script setup>
import { status } from '@/services/statusControls.js';
</script>

<template>
    <div class="status-bar" :class="status" />
</template>

<style scoped>
.status-bar {
    /* background: green; */
    /* position: sticky; */
    width: 100%;
    height: 0.25rem;
}

.loading {
    background: yellow;
}

.failed {
    background: red;
}

</style>