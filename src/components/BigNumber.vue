<script setup>
import { computed } from 'vue';

const props = defineProps(['value']);

const valueToDisplay = computed(() => Math.round(props.value).toLocaleString('uk-ua'));
</script>

<template>
    <p class="big-number">{{ valueToDisplay }}</p>
</template>

<style scoped>
.big-number {
    text-align: right;
}
</style>