<script setup>
import AccountsGroup from '@/components/FlexibleViewInput/AccountsGroup.vue';
import EditWaitChanges from './EditWaitChanges.vue';

import { ref } from 'vue';

defineProps(['edited']);

const eidtWait = ref(false);
</script>

<template>
<section class="edit-entry">
    <AccountsGroup
        :date="edited.date"
        :balances="[
            { name: 'pumb', account: edited.stefko.credit.account1 },
            { name: 'mono', account: edited.stefko.credit.account2 },
            { name: 'univers', account: edited.stefko.credit.account3 },
            { name: 'more', account: edited.stefko.credit.account4 },
        ]"
        :additional="[
            { name: 'total', account: edited.stefko.credit.sum },
        ]"
    />

    <div>
        <AccountsGroup
            :date="edited.date"
            :balances="[
                { name: 'pumb', account: edited.stefko.debitAccounts.account1 },
                { name: 'zp', account: edited.stefko.debitAccounts.account2 },
                { name: 'privat', account: edited.stefko.debitAccounts.account3 },
                { name: 'wait', account: edited.stefko.debitAccounts.account4 },
            ]"
            :additional="[
                { name: 'ready', account: edited.stefko.debitReady },
                { name: 'total', account: edited.stefko.debit },
            ]"
        />
        <button class="wait-button" @click="eidtWait=true">edit wait future</button>
    </div>

    <AccountsGroup
        :date="edited.date"
        :balances="[
            { name: 'm', account: edited.stefko.others.marta },
            { name: 'USD rate', account: edited.common.usd.rate },
            { name: 'USD', account: edited.common.usd.balance },
            { name: 'cash', account: edited.common.cash },
        ]"
        :additional="[
            { name: 'USD', account: edited.common.usd.uah },
            { name: 'Vira', account: edited.vira.balance },
            { name: 'Stefko', account: edited.stefko.balance },
            { name: 'total', account: edited.balance },
        ]"
    />

    <AccountsGroup
        :parts="[
            { name: 'stefko', account: edited.stefko.income },
            { name: 'debit %', account: edited.additionalIncome.debit },
            { name: 'transfer', account: edited.additionalIncome.cancel },
        ]"
        :additional="[
            { name: 'Vira', account: edited.vira.income },
            { name: 'usd', account: edited.common.usd.income },
            { name: 'total', account: edited.income },
        ]"
    />

    <section v-show="eidtWait" class="floating">
        <EditWaitChanges />
        <button class="wait-button" @click="eidtWait=false">hide</button>
    </section>
</section>
</template>

<style scoped>
.edit-entry {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    width: fit-content;
    justify-self: center;
    /* margin: auto; */
}

.wait-button {
    width: 50%;
    margin-inline: 25%;
}

.floating {
    /* width: 200px; */
    /* height: 200px; */
    position: absolute;
    margin-top: 0.5rem;
    background: white;
    border: solid 1px;
    border-radius: 5px;
    outline: solid white 5px;
    padding: 0.5rem;
}
</style>