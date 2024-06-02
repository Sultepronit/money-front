<script setup>
import EditParts from './EditParts.vue';
import { reversed as list } from '@/services/data.js';
defineProps(['income', 'expense']);

</script>

<template>
<div class="area">
    <div class="half">
        <p class="title">доходи</p>
        <EditParts :parted="income" />
    </div>
    <div class="half">
        <p class="title">розходи</p>
        <EditParts :parted="expense" />
    </div>
</div>
</template>

<style scoped>
.area {
    display: grid;
    grid-template-columns: 1fr 1fr;
    /* display: flex; */
}
.half {
    /* border: 1px solid gray;
    border-radius: 0.2em; */
    margin: 0.1em;
    padding: 0.1em;
    /* width: 50%; */
    /* width: 99%; */
    /* width: 45vw; */
}

.title {
    text-align: center;
}

input {
    width: 97%;
    text-align: right;
    /* padding-inline: 0.5em; */
    /* padding-right: 0.5em; */
}
</style>