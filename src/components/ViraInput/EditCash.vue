<script setup>
import EditParts from './EditParts.vue';
import EditAccount from './EditAccount.vue';

defineProps(['income', 'expense']);
</script>

<template>
    <EditAccount
        leftTitle="доходи"
        leftClass="income"
        rightTitle="розходи"
        rightClass="expense"
    >
        <template #left>
            <EditParts :parted="income" />
        </template>

        <template #right>
            <EditParts :parted="expense" />
        </template>
    </EditAccount>
</template>

<style scoped>

</style>