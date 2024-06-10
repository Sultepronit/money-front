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
<section class="the-body">
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
</section>
</template>

<style scoped>
.the-body {
    /* max-width: 20em;
    margin: 0.3rem; */
}
.list {
    height: calc(100dvh - 19em);
    overflow: auto;
}
.element {
    margin: 0.4rem 0.1rem;
    padding: 0.1rem;
    border-radius: 0.4rem;
    background-color: #ebeaea;
}
.selected {
    background-color: #b5ffb5;
}
</style>