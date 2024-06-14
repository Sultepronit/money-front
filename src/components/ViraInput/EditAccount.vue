<script setup>
defineProps(['leftTitle', 'leftClass', 'rightTitle', 'rightClass']);
</script>

<template>
<div class="area">
    <div class="half" :class="leftClass">
        <p class="title">{{ leftTitle }}</p>
        <slot name="left"></slot>
    </div>
    <div class="half" :class="rightClass">
        <p class="title">{{ rightTitle }}</p>
        <slot name="right"></slot>
    </div>
</div>
</template>

<style scoped>
.area {
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
</style>