<script setup>
import './styles/index.css'
import AddForm from './components/AddForm.vue'
import { ref } from 'vue'
import PersonCard from './components/PersonCard.vue'

const people = ref([])

function addPerson(person) {
  people.value.push(person)
}
</script>

<template>
  <div class="bg-green-950 text-neutral-50 w-screen h-screen p-4">
    <AddForm @addPerson="addPerson" />
    <ul v-for="(person, i) in people" :key="i">
      <PersonCard :name="person.name" />
    </ul>
  </div>
</template>