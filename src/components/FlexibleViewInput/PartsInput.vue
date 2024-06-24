<script setup>
import { ref, computed } from 'vue';
const props = defineProps(['parted']);

const plussed = computed(() => {
    return props.parted.parts.length > 0
        ? props.parted.parts.reduce((acc, val) => `${acc}+${val}`)
        : '';
});

const focused = ref(false);
const theValue = computed(() => focused.value ? plussed.value : props.parted.sum);

const hintedResult = ref('');

function parse(input) {
    input = input.replaceAll(',', '.');
    const splitted = input.split('+');
    console.log(splitted);
    props.parted.update(splitted);
}
</script>

<template>
<div>
    <input
        type="text"
        :value="theValue"
        :class="{focused}"
        @change="parse($event.target.value)"
        @focus="focused=true"
        @blur="focused=false"
    >
    <p class="result" v-show="focused">{{ hintedResult }}</p>
</div>
</template>

<style scoped>
.focused {
    position: absolute;
    width: 15em;
}
.result {
    position: absolute;
    margin-top: 1.25em;
    margin-left: 0.1em;
    background: yellowgreen;
    padding-inline: 0.4em;
}
</style>