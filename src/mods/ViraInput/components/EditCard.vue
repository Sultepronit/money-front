<script setup>
import EditParts from './EditParts.vue';
import EditAccount from './EditAccount.vue';
import { reversed as list } from '@/services/data.js';
const props = defineProps(['income', 'index', 'cardName']);

</script>

<template>
    <EditAccount leftTitle="доходи" rightTitle="баланс">
        <template #left>
            <!-- <p class="title">доходи</p> -->
            <EditParts :parted="income" />
        </template>

        <template #right>
            <!-- <p class="title">баланс</p> -->
            <input
                type="number"
                v-model="list[index].vira[cardName].balance"
                @change="list[index].vira[cardName].saveBalance()"
            >
        </template>
    </EditAccount>
<!-- <div class="area">
    <div class="half">
        
    </div>
    <div class="half">
        
    </div>
</div> -->
</template>

<style scoped>
.area {
    display: grid;
    grid-template-columns: 1fr 1fr;
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