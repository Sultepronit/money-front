<script setup>
import { ref, computed } from 'vue';
const props = defineProps(['parted']);

const plussed = computed(() => {
    return props.parted.parts.length > 0
        ? props.parted.parts.reduce((acc, val) => `${acc}+${val}`)
        : '';
});

const sum = computed(() => {
    const fractional = String(props.parted.sum).split('.')[1];
    if(fractional && fractional.length > 2) {
        return props.parted.sum.toFixed(2);
    }
    return props.parted.sum;
});

const focused = ref(false);
const theValue = computed(() => focused.value ? plussed.value : sum.value);

function parse(input) {
    input = input.replaceAll(',', '.');
    const splitted = input.split('+');
    // console.log(splitted);
    props.parted.update(splitted);
}
</script>

<template>
<div>
    <input
        type="text"
        :value="theValue"
        class="parts-input"
        @change="parse($event.target.value)"
        @focus="focused=true"
        @blur="focused=false"
    >
</div>
</template>

<style scoped>
.parts-input {
    border-width: 0;
}
</style>