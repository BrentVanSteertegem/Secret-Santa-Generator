<script setup>
const props = defineProps({
    name: String
})

const emit = defineEmits(['removePerson'])

function onClick($event) {
    emit('removePerson', $event)
}
</script>

<template>
    <section class="bg-red-800 p-2 rounded-lg w-60 justify-between">
        <p>
            {{ props.name }}
        </p>
        <button @click="onClick">
            <font-awesome-icon :icon="['far', 'trash-can']" />
        </button>
    </section>
</template>