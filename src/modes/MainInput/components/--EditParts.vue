<script setup>
import { ref, computed } from 'vue';

const props = defineProps(['parted']);

const focused = ref(false);

function update(index, value) {
    const copy = [...props.parted.parts];
    if(index === 0) {
        if(Number(value) === 0) return;

        copy.unshift(value);
    } else {
        index--;
        if(Number(value) !== 0) {
            copy[index] = value;
        } else {
            copy.splice(index, 1);
        }
    }
    props.parted.update(copy);
}
</script>

<template>
<div class="the-area" >
    <input
        type="text"
        :value="parted.sum"
        @change="parse($event.target.value)"
        @focus="focused=true"
        @blur="focused=false"
        @hover="console.log('here we go!')"
    >
    <input
        v-if="focused"
        :class="{focused}"
        v-for="(part, index) in ['', ...parted.parts]"
        :key="part"
        type="number"
        :value="part"
        @change="update(index, $event.target.value)"
    >
</div>
</template>

<style scoped>
.the-area {
    /* height: 4.2em; */
    /* overflow: auto; */
}
.focused {
    position: absolute;
    width: 10em;
}
input {
    /* width: 100%; */
    text-align: right;
}
</style>