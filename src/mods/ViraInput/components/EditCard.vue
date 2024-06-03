<script setup>
import EditParts from './EditParts.vue';
import EditAccount from './EditAccount.vue';
import { reversed as list } from '@/services/data.js';
const props = defineProps(['income', 'index', 'cardName']);

</script>

<template>
    <EditAccount leftTitle="доходи" rightTitle="баланс" rightClass="balance">
        <template #left>
            <EditParts :parted="income" />
        </template>

        <template #right>
            <input
                type="number"
                v-model="list[index].vira[cardName].balance"
                @change="list[index].vira[cardName].saveBalance()"
            >
        </template>
    </EditAccount>
</template>

<style scoped>
input {
    width: 100%;
    text-align: right;
}
</style>