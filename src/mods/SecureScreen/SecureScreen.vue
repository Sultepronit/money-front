<script setup>
import { ref, onMounted } from 'vue';
import { loggedIn } from '@/utils/security.js';

const password = ref(null);
onMounted(() => {
    console.log(password);
    password.value.focus();
});
</script>

<template>
<div class="page">
    <input
        class="password"
        type="password"
        ref="password"
        @change="loggedIn=true"
    >
</div>
</template>

<style scoped>
.page {
    display: flex;
    justify-content: center;
}
.password {
    margin-top: 20vh;
    max-width: 90%;
    font-size: 2rem;
    text-align: center;
}
</style>