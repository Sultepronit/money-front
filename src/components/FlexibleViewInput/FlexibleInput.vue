<script setup>
import AccountsGroup from '@/components/FlexibleViewInput/AccountsGroup.vue';
import EditWaitChanges from './EditWaitChanges.vue';

import { ref } from 'vue';

defineProps(['edited']);

const editWait = ref(false);
const editCurrency = ref(false);
</script>

<template>
<section class="edited">
    <section class="float-wrap">
        <div class="floating" v-if="editWait" >
            <EditWaitChanges />
            <button class="wait-button" @click="editWait=false">hide</button>
        </div>
    </section>

    <section class="main-fields">
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

        <AccountsGroup
            :date="edited.date"
            :balances="[
                { name: 'pumb', account: edited.stefko.debitAccounts.account1 },
                { name: 'zp', account: edited.stefko.debitAccounts.account2 },
                { name: 'izi', account: edited.stefko.debitAccounts.account3 },
                { name: 'wait', account: edited.stefko.debitAccounts.account4 },
            ]"
            :additional="[
                { name: 'ready', account: edited.stefko.debitReady },
                { name: '€', account: edited.stefko.currency.eur.uah },
                { name: 'total', account: edited.stefko.debit },
            ]"
        />

        <AccountsGroup
            :date="edited.date"
            :balances="[
                { name: 'cash', account: edited.common.cash },
            ]"
            :additional="[
                { name: '$', account: edited.common.usd.uah },
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
                { name: '€*', account: edited.stefko.currency.eur.income },
                { name: '$', account: edited.common.usd.income },
                { name: 'total', account: edited.income },
            ]"
        />
    </section>

    <section class="buttons">
        <button
            class="wait-button"
            @click="editWait = !editWait"
         >
            edit wait future
        </button>
        <button
            class="wait-button"
            @click="editCurrency = !editCurrency"
        >
            edit currency
        </button>
    </section>

    <section class="currency" v-if="editCurrency">
        <AccountsGroup
            :date="edited.date"
            :balances="[
                { name: '€', account: edited.common.rates.eur },
                { name: '$', account: edited.common.rates.usd },
            ]"
        />

        <AccountsGroup
            :date="edited.date"
            :balances="[
                { name: '€', account: edited.stefko.currency.eur.balance },
            ]"
            :parts="[
                { name: '⇄', account: edited.stefko.currency.eur.exchanges },
            ]"
            :additional="[
                { name: '₴', account: edited.stefko.currency.eur.uah },
                { name: '⇅', account: edited.stefko.currency.eur.history },
                { name: '+++', account: edited.stefko.currency.eur.incomeHistory },
                { name: '+', account: edited.stefko.currency.eur.income },
            ]"
        />

        <AccountsGroup
            :date="edited.date"
            :balances="[
                { name: '$', account: edited.common.usd.balance },
            ]"
            :parts="[
                { name: '⇄', account: edited.common.usd.exchanges },
            ]"
            :additional="[
                { name: '₴', account: edited.common.usd.uah },
                { name: '⇅', account: edited.common.usd.history },
                { name: '+++', account: edited.common.usd.incomeHistory },
                { name: '+', account: edited.common.usd.income },
            ]"
        />
    </section>
</section>

</template>

<style scoped>
.edited {
    display: grid;
    /* justify-content: space-around; */
}
.main-fields {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    width: fit-content;
    justify-self: center;
    /* margin: auto; */
}

.currency {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    width: fit-content;
    justify-self: center;
}

.buttons {
    display: flex;
    /* justify-self: center; */
    justify-content: space-around;
}

.wait-button {
    /* width: 50%; */
    /* margin-inline: 25%; */
    font-size: inherit;
    padding-inline: 2em;
    margin: 0.4rem;
}

.float-wrap {
    display: flex;
    justify-content: space-around;
}

.floating {
    /* width: 200px; */
    /* height: 200px; */
    position: absolute;
    margin-top: 0.5rem;
    /* margin: 0.5rem 1rem; */
    background: white;
    border: solid 1px;
    border-radius: 5px;
    outline: solid white 5px;
    padding: 0.5rem;
}
</style>