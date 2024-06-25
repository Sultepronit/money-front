<script setup>
import AccountsGroup from '@/components/FlexibleViewInput/AccountsGroup.vue';

defineProps(['edited']);
</script>

<template>
<section class="edit-entry">
    <AccountsGroup
        title="credits"
        :date="edited.date"
        :balances="[
            { name: 'pumb', account: edited.stefko.credit.account1 },
            { name: 'mono', account: edited.stefko.credit.account2 },
            { name: 'univers', account: edited.stefko.credit.account3 },
            { name: 'more', account: edited.stefko.credit.account4 },
        ]"
    />

    <AccountsGroup
        title="debits"
        :balances="[
            { name: 'pumb', account: edited.stefko.debitAccounts.account1 },
            { name: 'zp', account: edited.stefko.debitAccounts.account2 },
            { name: 'cash', account: edited.common.cash },
        ]"
    />

    <AccountsGroup
        title="income"
        :parts="[
            { name: 'stefko', account: edited.stefko.income },
            { name: 'debit %', account: edited.additionalIncome.debit },
            { name: 'transfer', account: edited.additionalIncome.cancel },
        ]"
    />

    <AccountsGroup
        title="additional"
        :balances="[
            { name: 'usd', account: edited.common.usd.balance },
            { name: 'usd rate', account: edited.common.usd.rate },
            { name: 'm', account: edited.stefko.others.marta },
        ]"
    />
</section>
</template>

<style scoped>
.edit-entry {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
</style>