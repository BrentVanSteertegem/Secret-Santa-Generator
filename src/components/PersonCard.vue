<script setup>
const props = defineProps({
    name: String,
    people: Array
})

const emit = defineEmits(['removePerson'])

function onClick($event) {
    emit('removePerson', $event)
}
</script>

<template>
    <section class="bg-red-800 p-2 rounded-lg w-60 flex-col gap-3">
        <section class="w-full justify-between">
            <h3 class="text-2xl leading-none">
                {{ props.name }}
            </h3>
            <button @click="onClick">
                <font-awesome-icon :icon="['far', 'trash-can']" />
            </button>
        </section>
        <section class="flex-col gap-1 bg-inherit">
            <label for="selectPeople">Can buy for everyone except:</label>
            <select class="bg-inherit border p-2 rounded-lg focus-visible:outline-none focus-visible:rounded-b-none ease-in-out">
                <option
                    name="selectPeople"
                    class="bg-inherit rounded-lg"
                    v-for="(person, i) in props.people.filter(person => person.name !== props.name)"
                    :key="i"
                    :value="i"
                >
                    {{person.name}}
                </option>
            </select>
        </section>
    </section>
</template>