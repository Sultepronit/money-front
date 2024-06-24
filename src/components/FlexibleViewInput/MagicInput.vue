<script setup>
import { ref, computed } from 'vue';
const props = defineProps(['account']);

let expression = ref('');
// console.log(props.account);
const theValue = computed(() => expression.value || props.account.balance);

const hintedResult = ref('');
const focused = ref(false);

function parse(input) {
    input = input.replaceAll(',', '.');
    if(isNaN(input)) {
        try {
            const result = new Function(`return ${input}`)();
            expression.value = input;
            hintedResult.value = result;
            props.account.updateValue(result);
        } catch (error) {
            console.log('The heck?')
        }
    } else {
        expression.value = '';
        hintedResult.value = '';
        props.account.updateValue(Number(input));
    }
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
    /* position: absolute;
    width: 10em; */
}
.result {
    position: absolute;
    margin-top: 1.25em;
    margin-left: 0.1em;
    background: yellowgreen;
    padding-inline: 0.4em;
}
</style>