<script setup>
import { ref, computed } from 'vue';
import { reversed as list } from '@/services/data.js';

// console.log(data);

// const list = computed(() => data.value.slice().reverse());

const editedIndex = ref(0);
const edited = computed(() => list.value[editedIndex.value]);
</script>

<template>
<section class="page">
    <div class="stats-item">
        <p>Vira</p>
        <p class="number">{{ list[0].vira.balance }}</p>
        <p class="number">{{ list[0].vira.balanceChange }}</p>
    </div>
    <div class="stats-item">
        <p>Батько</p>
        <p class="number">{{ Math.round(list[0].stefko.balance) }}</p>
        <p class="number">{{ Math.round(list[0].stefko.change) }}</p>
    </div>
    <div class="stats-item">
        <p>Cash</p>
        <p class="number">{{ list[0].common.cash.balance }}</p>
        <p class="number">{{ list[0].common.cash.change }}</p>
    </div>
    <div class="stats-item">
        <p>USD</p>
        <p class="number">{{ list[0].common.usd.balance.balance }} / {{ list[0].common.usd.uah }}</p>
        <p class="number">{{ list[0].common.usd.change }}</p>
    </div>
    <div class="stats-item">
        <p>balance</p>
        <p class="number">{{ list[0].balance }} </p>
        <p class="number">{{ list[0].change }}</p>
    </div>
    <div class="stats-item">
        <p>income</p>
        <p></p>
        <p class="number">{{ list[0].income.sum }}</p>
    </div>
    <div class="stats-item">
        <p>expense</p>
        <p></p>
        <p class="number">{{ list[0].change - list[0].income.sum }}</p>
    </div>
    
    <!-- <pre>{{ list[0].common.usd.balance.balance }}</pre> -->
    
    <!-- <pre>{{ list[0] }}</pre> -->
    <!-- <EditedEntry
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
    </div> -->
</section>
</template>

<style scoped>
.page {
    max-width: 20em;
    margin: 0.3rem;
}
.stats-item {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
}
.number {
    text-align: right;
}
.list {
    height: calc(100vh - 17em);
    overflow: auto;
}
</style>