<script setup>
import './styles/index.css'
import AddForm from './components/AddForm.vue'
import { ref } from 'vue'
import PersonCard from './components/PersonCard.vue'

const people = ref([])

function addPerson(person) {
  people.value.push(person)
}

function removePerson(index) {
  people.value.splice(index, 1)
}
</script>

<template>
  <div class="bg-green-950 text-neutral-50 w-screen h-screen p-4 flex flex-col gap-8">
    <AddForm @addPerson="addPerson" />
    <ul class="flex flex-wrap justify-center gap-2">
      <li v-for="(person, i) in people" :key="i">
        <PersonCard :name="person.name" @removePerson="() => removePerson(i)"/>
      </li>
    </ul>
  </div>
</template>