<script setup>
defineProps(['leftTitle', 'rightTitle']);
</script>

<template>
<div class="area">
    <div class="half">
        <p class="title">{{ leftTitle }}</p>
        <slot name="left"></slot>
    </div>
    <div class="half">
        <p class="title">{{ rightTitle }}</p>
        <slot name="right"></slot>
    </div>
</div>
</template>

<style scoped>
.area {
    /* height: 7em;
    overflow: hidden; */
    display: grid;
    grid-template-columns: 1fr 1fr;
}
.half {
    margin: 0.1em;
    padding: 0.1em;
}

.title {
    text-align: center;
}

input {
    width: 97%;
    text-align: right;
    /* padding-inline: 0.5em; */
    /* padding-right: 0.5em; */
}
</style>