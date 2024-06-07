<script setup>
import { ref } from 'vue';
const props = defineProps(['account']);

const theValue = '' + props.account.balance;
const hintedResult = ref('');
const focused = ref(false);

function parse(input) {
    input = input.replaceAll(',', '.');
    if(isNaN(input)) {
        try {
            const result = new Function(`return ${input}`)();
            hintedResult.value = result;
            props.account.update(result);
        } catch (error) {
            console.log('The heck?')
        }
    } else {
        hintedResult.value = '';
        props.account.update(Number(input));
    }
}
</script>

<template>
<div class="input-result">
    <input
        type="text"
        :value="account.balance"
        :class="{focused}"
        @change="parse($event.target.value)"
        @focus="focused=true"
        @blur="focused=false"
    >
    <p class="result" v-show="focused">{{ hintedResult }}</p>
</div>
</template>

<style scoped>
.input-result {
    /* display: flex; */
}
.focused {
    position: absolute;
    width: 10em;
}
.result {
    position: absolute;
    margin-top: 1.25em;
    margin-left: 0.1em;
    background: yellowgreen;
    padding-inline: 0.4em;
}
</style>