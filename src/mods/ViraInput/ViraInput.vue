<script setup>
import ListElement from './components/ListElement.vue';
import { ref, computed } from 'vue';
import { data } from '@/services/data.js';

console.log(data);

const edited = ref(0);

const reversed = computed(() => { return data.value.slice().reverse()} );
</script>

<template>
    <ListElement
        v-for="(entry, index) in reversed"
        :key="entry.date"
        :date="entry.date"
        :entry="entry.vira"
        class="element"
        :class="{selected: edited === index}"
        @click="edited = index"
    />
</template>

<style scoped>
.element {
    border: 1px solid;
}
.selected {
    background: lavenderblush;
}
</style>