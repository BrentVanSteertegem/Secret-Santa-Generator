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
    <ul class="flex flex-wrap justify-center gap-2">
        <li
            v-for="(person, i) in props.people"
            :key="i"
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