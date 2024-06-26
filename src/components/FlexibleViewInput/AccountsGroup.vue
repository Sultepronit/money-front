<script setup>
import MagicInput from '@/components/FlexibleViewInput/MagicInput.vue';
import PartsInput from '@/components/FlexibleViewInput/PartsInput.vue';

defineProps(['date', 'balances', 'parts', 'additional']);
</script>

<template>
<div class="accounts">
    <!-- <div class="account" v-for="item in balances">
        <p class="item">{{ item.name }}</p>
        <MagicInput :account="item.account" :date="date" />
    </div> -->

    <!-- <div class="account" v-for="item in parts">
        <p class="item">{{ item.name }}</p>
        <PartsInput :parted="item.account" />
    </div> -->

    <!-- <div class="account" v-for="item in additional">
        <p class="item">{{ item.name }}</p>
        <p class="">{{ item.account }}</p>
    </div> -->
    <table>
        <tbody>
            <tr class="" v-for="item in balances">
                <td class="title">{{ item.name }}</td>
                <td>
                    <MagicInput :account="item.account" :date="date" />
                </td>
            </tr>
            <tr class="" v-for="item in parts">
                <td class="title">{{ item.name }}</td>
                <td>
                    <PartsInput :parted="item.account" />
                </td>
            </tr>
            <tr class="" v-for="item in additional">
                <td class="title">{{ item.name }}</td>
                <td class="">{{ item.account }}</td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<style scoped>
.accounts {
    width: 15em;
    margin: 0.2em;
    padding: 0.2em;
    /* border: 1px solid gray; */
}
table, tr, td {
    border: 1px solid;
    border-collapse: collapse;
}
td {
    text-align: right;
    text-wrap: nowrap;
}
.title {
    width: 4em;
}
.account {
    /* display: flex; */
    display: grid;
    grid-template-columns: 4em 1fr;
   
}
.item {
    text-align: right;
    padding-inline: 0.2em;
}
</style>