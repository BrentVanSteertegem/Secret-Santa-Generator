<script setup>
const props = defineProps({
    name: String
})
</script>

<template>
    <li>{{ props.name }}</li>
</template>