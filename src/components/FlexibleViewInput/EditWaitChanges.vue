<script setup>
import { computed, onMounted, onUpdated } from 'vue';
import { waitDebitChanges } from '@/services/data.js';
import { get_yyyy_mm_dd, shiftDate, getRelativeDate } from '@/utils/handleDate';
import updateWaitChanges from '@/services/updateWaitChanges';

const today = new Date();

const editedList = computed(() => {
    // const nextMonth = shiftDate(today, 31);
    const nextMonth = getRelativeDate(today, 1, today.getDate());
    const newEntryDate = get_yyyy_mm_dd(nextMonth);
    return [...waitDebitChanges.value, [newEntryDate, '']];
});

let previousJson = JSON.stringify(waitDebitChanges.value);

function isFuture(date) {
    return date > get_yyyy_mm_dd(today);
}

function update() {
    const actualData = editedList.value
        .filter(entry => entry[1] && isFuture(entry[0]))
        .sort((a, b) => a > b ? 1 : -1);

    const actualJson = JSON.stringify(actualData);

    if(previousJson === actualJson) return;

    previousJson = actualJson;

    // just in case we are adding or removing the new entry - the main case
    waitDebitChanges.value = actualData; 

    updateWaitChanges(actualJson);
}
update();
</script>

<template>
    <div v-for="change in editedList" :key="change[0]">
        <input type="date" v-model=change[0] @change="update" />
        <input type="number" v-model=change[1] @change="update" />
    </div>
</template>

<style scoped>
input {
    width: 8em;
    max-width: 45vw;
    height: 1.5em;
    margin: 0.1rem;
}
</style>
