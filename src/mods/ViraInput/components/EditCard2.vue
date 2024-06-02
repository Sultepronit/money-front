<script setup>
import { reversed as list } from '@/services/data.js';
const props = defineProps(['income', 'index', 'cardName']);

console.log(props);

function updateIncome(index, value) {
    const copy = [...props.income.parts];
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
    props.income.update(copy);
}
</script>

<template>
<div class="area">
    <!-- <p>{{ index }}</p> -->
    <!-- <pre>{{ list[index].vira[cardName] }}</pre> -->
    <!-- <pre>{{ card }}</pre> -->
    <!-- <pre>{{ income }}</pre> -->
    <div class="half">
        <p class="title">доходи</p>
        <input
            v-for="(part, index) in ['', ...income.parts]"
            :key="part"
            type="number"
            :value="part"
            @change="updateIncome(index, $event.target.value)"
        >
    </div>
    <div class="half">
        <p class="title">баланс</p>
        <input type="number" v-model="list[index].vira[cardName].balance">
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