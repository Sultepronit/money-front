<script setup>
import { ref } from 'vue';
const props = defineProps(['account']);

// const theValue = ref('');
// theValue.value = props.account.balance;
const theValue = '' + props.account.balance;
const theResult = ref('');

function parse(input) {
    // account.update
    // console.log(input);
    // console.log(new Function(`return ${input}`)());
    try {
        const result = new Function(`return ${input}`)();
        // console.log(result);
        // theValue.value = input + '=' + result;
        theResult.value = result;
        props.account.update(result);
    } catch (error) {
        console.log('The heck?')
    }
}

function handle(input) {
    
}
</script>

<template>
<div class="input-result">
    <input
        type="text"
        :value="theValue"
        @change="parse($event.target.value)"
    >
    <p>{{ theResult }}</p>
</div>
</template>

<style scoped>
.input-result {
    display: flex;
}
</style>