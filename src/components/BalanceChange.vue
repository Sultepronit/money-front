<script setup>
import { computed } from 'vue';

const props = defineProps(['value']);

const rounded = computed(() => Math.round(props.value));

const valueToDisplay = computed(() =>
    rounded.value > 0 ? `+${rounded.value}` : rounded.value === 0 ? '' : rounded.value
);

const color = computed(() => props.value > 0 ? 'income' : 'expense');
</script>

<template>
    <p class="balance-change" :class="color">{{ valueToDisplay }}</p>
</template>

<style scoped>
.balance-change {
    text-align: right;
}
/* .green {
    color: green;
}
.red {
    color: red;
} */
</style>