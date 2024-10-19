<script setup>
    import PersonCard from './PersonCard.vue'

    const props = defineProps({
        people: Array
    })

    const emit = defineEmits(['removePerson'])

    const removePerson = (index) => {
        emit('removePerson', index)
    }
</script>

<template>
    <ul class="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-3">
        <li
            v-for="(person, i) in props.people"
            :key="i"
            class="w-full"
        >
            <PersonCard
                :name="person.name"
                :people="props.people"
                @removePerson="removePerson"
                @selectPerson="selectPerson"
            />
        </li>
      </ul>
</template>