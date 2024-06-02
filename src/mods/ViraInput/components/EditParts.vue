<script setup>
const props = defineProps(['parted']);

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
    <input
        v-for="(part, index) in ['', ...parted.parts]"
        :key="part"
        type="number"
        :value="part"
        @change="update(index, $event.target.value)"
    >
</template>

<style scoped>
input {
    width: 97%;
    text-align: right;
    /* padding-inline: 0.5em; */
    /* padding-right: 0.5em; */
}
</style>