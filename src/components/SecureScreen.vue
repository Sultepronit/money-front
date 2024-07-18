<script setup>
import { ref, onMounted } from 'vue';
import { handleLogin, redirectUser, loginStatus } from '@/utils/security.js';

const password = ref(null);
onMounted(() => {
    password.value.focus();
});
</script>

<template>
<div class="page">
    <div class="panel">
        <input
            type="text"
            id="username"
            name="username"
            @change="redirectUser($event.target.value)"
        >
        <input
            class="password"
            type="password"
            ref="password"
            @change="handleLogin($event.target.value)"
        >
        <p class="status">{{ loginStatus }}</p>
    </div>
</div>
</template>

<style scoped>
.page {
    display: flex;
    justify-content: center;
}
.panel {
    margin-top: 20vh;
    /* max-width: 90%; */
}
/*.password {*/
input {
    display: block;
    margin: 0.4rem;
    width: 8em;
    font-size: 2rem;
    text-align: center;
}
.status {
    margin-top: 0.5em;
    text-align: center;
}
</style>