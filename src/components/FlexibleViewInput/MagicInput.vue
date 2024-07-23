<script setup>
import { ref, computed } from 'vue';
const props = defineProps(['account', 'date']);

const verbose = ref({});

const theValue = computed(() =>
    verbose.value[props.date] && verbose.value[props.date].expression
        ? verbose.value[props.date].expression
        :  props.account.balance
);

function parse(input) {
    input = input.replaceAll(',', '.');
    if(isNaN(input)) {
        try {
            const result = new Function(`return ${input}`)();
            verbose.value[props.date] = { expression: input, result };
            console.log(verbose.value);
            props.account.updateValue(result);
        } catch (error) {
            console.log('The heck?')
        }
    } else {
        verbose.value[props.date] = null;
        props.account.updateValue(Number(input));
    }
}
</script>

<template>
<div class="field">
    <input
        type="text"
        :value="theValue"
        class="magic-input"
        @change="parse($event.target.value)"
    >
    <p class="result" v-show="verbose[date]?.result">= {{ verbose[date]?.result }}</p>
</div>
</template>

<style scoped>
.field {
    display: flex;
}
.magic-input {
    border-width: 0;
}
.result {
    padding-left: 0.3em;
    font-style: italic;
}
</style>