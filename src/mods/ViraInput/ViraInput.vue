<script setup>
import EditedEntry from './components/EditedEntry.vue';
import ListElement from './components/ListElement.vue';
import { ref, computed } from 'vue';
import { reversed as list } from '@/services/data.js';

// console.log(data);

// const list = computed(() => data.value.slice().reverse());

const editedIndex = ref(0);
const edited = computed(() => list.value[editedIndex.value]);
</script>

<template>
    <EditedEntry
        v-if="edited"
        :date="edited.date"
        :entry="edited.vira"
        :index="editedIndex"
    />
    <div class="list">
        <ListElement
            v-for="(entry, index) in list"
            :key="entry.date"
            :date="entry.date"
            :entry="entry.vira"
            class="element"
            :class="{selected: editedIndex === index}"
            @click="editedIndex = index"
        />
    </div>
</template>

<style scoped>
.element {
    margin: 0.1rem;
    padding: 0.1rem;
    border: 1px solid;
}
.selected {
    background: lavenderblush;
}
</style>