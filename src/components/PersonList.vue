<script setup>
    import PersonCard from './PersonCard.vue'

    const props = defineProps({
        people: Array
    })

    const emit = defineEmits(['removePerson', 'manageExceptions'])

    const removePerson = (index) => {
        emit('removePerson', index)
    }

    const manageExceptions = (index, exceptions) => {
        emit('manageExceptions', index, exceptions)
    }
</script>

<template>
    <ul class="grid md:grid-cols-2 2xl:grid-cols-3 gap-3">
        <li
            v-for="(person, i) in props.people"
            :key="i"
            class="w-full"
        >
            <PersonCard
                :people="props.people"
                :index="i"
                @removePerson="removePerson"
                @manageExceptions="manageExceptions"
            />
        </li>
      </ul>
</template>