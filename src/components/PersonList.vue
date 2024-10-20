<script setup>
    import PersonCard from './PersonCard.vue'

    const props = defineProps({
        people: Array,
        generatedList: Array
    })

    const emit = defineEmits(['removePerson', 'manageExceptions'])

    function removePerson(name) {
        emit('removePerson', name)
    }

    function manageExceptions(name, exceptions) {
        emit('manageExceptions', name, exceptions)
    }
</script>

<template>
    <ul
        v-if="props.generatedList.length === 0"
        class="c-person-list grid md:grid-cols-2 2xl:grid-cols-3 gap-3"
    >
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
    <table
        v-else
        class="w-[408px] self-center border"
    >
    <tr>
        <th class="w-1/2 text-center border-r text-lg p-2">From</th>
        <th class="w-1/2 text-center text-lg">To</th>
    </tr>
        <tr
            v-for="(match, i) in props.generatedList"
            :key="i"
            class="border-t"
        >
            <td class="w-1/2 text-center border-r text-lg p-2">{{match.from}}</td>
            <td class="w-1/2 text-center text-lg p-2">{{match.to}}</td>
        </tr>
    </table>
</template>