<script setup>
defineProps(['value', 'action']);
</script>

<template>
<div class="the-input">
    <input
        type="number"
        :value="value"
        @change="action($event.target.value)"
    >
</div>
</template>