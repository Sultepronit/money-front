<script setup>
defineProps(['account']);
</script>

<template>
<div class="the-input">
    <input
        type="number"
        :value="account.balance"
        @change="account.update($event.target.value)"
    >
</div>
</template>

<style scoped>
/* .the-input {
    width: 80%;
} */

</style>