<script setup>
import EditParts from './EditParts.vue';
import EditAccount from './EditAccount.vue';

defineProps(['income', 'account']);
</script>

<template>
    <EditAccount
        leftTitle="доходи"
        leftClass="income"
        rightTitle="баланс"
        rightClass="balance"
    >
        <template #left>
            <EditParts :parted="income" />
        </template>

        <template #right>
            <input
                type="number"
                :value="account?.balance"
                @change="account.updateValue(Number($event.target.value))"
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