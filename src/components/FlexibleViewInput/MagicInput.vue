<script setup>
import { ref, computed } from 'vue';
const props = defineProps(['account', 'date']);

const verbose = ref({});
// console.log(verbose.value[props.date]);

// let expression = ref('');
// const theValue = computed(() => expression.value || props.account.balance);
const theValue = computed(() =>
    verbose.value[props.date] && verbose.value[props.date].expression
        ? verbose.value[props.date].expression
        :  props.account.balance
);

const hintedResult = ref('');
const focused = ref(false);

function parse(input) {
    input = input.replaceAll(',', '.');
    if(isNaN(input)) {
        try {
            const result = new Function(`return ${input}`)();
            // expression.value = input;
            // hintedResult.value = result;
            verbose.value[props.date] = { expression: input, result };
            // console.log(verbose.value);
            props.account.updateValue(result);
        } catch (error) {
            console.log('The heck?')
        }
    } else {
        // expression.value = '';
        // hintedResult.value = '';
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
        :class="{focused}"
        class="magic-input"
        @change="parse($event.target.value)"
        @focus="focused=true"
        @blur="focused=false"
    >
    <!-- <p class="result" v-show="focused">{{ hintedResult }}</p> -->
    <!-- <p class="result">{{ hintedResult }}</p> -->
    <p class="result" v-show="verbose[date]?.result">{{ verbose[date]?.result }}</p>
</div>
</template>

<style scoped>
.field {
    display: flex;
}
.magic-input {
    /* text-align: right; */
}
.focused {
    /* position: absolute;
    width: 10em; */
}
.result {
    padding-left: 0.2em;
    /* position: absolute; */
    /* margin-top: 1.25em; */
    /* margin-left: 0.1em; */
    /* background: #4fff4f;
    padding-inline: 0.4em;
    border-radius: 0.3em; */
}
</style>