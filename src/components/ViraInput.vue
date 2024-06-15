<script setup>
import EditedEntry from './ViraInput/EditedEntry.vue';
import ListElement from './ViraInput/ListElement.vue';
import { ref, computed } from 'vue';
// import { reversed as list } from '@/services/data.js';
import { reversed } from '@/services/data.js';

const list = computed(() => {
    return reversed.value.slice(0, 10);
});

const editedIndex = ref(0);
const edited = computed(() => list.value[editedIndex.value]);
</script>

<template>
<section class="block">
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
.block {
    max-width: 25em;
    margin: auto;
}
.list {
    height: calc(100dvh - 19.6em);
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