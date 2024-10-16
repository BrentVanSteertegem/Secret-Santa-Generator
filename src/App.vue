<script setup>
import { ref } from 'vue'
import './styles/index.css'
import AddForm from './components/AddForm.vue'
import PersonList from './components/PersonList.vue'

const people = ref([])

function addPerson(person) {
  people.value.push(person)
}

function removePerson(index) {
  people.value.splice(index, 1)
}

let $overlay
function setOverlay() {
  $overlay = document.querySelector('.c-overlay')
}

function jumpScare() {
  if(!$overlay) setOverlay()
  setTimeout(() => {
    $overlay.classList.remove('hidden')
    setTimeout(() => {
      $overlay.classList.add('hidden')
    }, 200)
  }, 2000)
}
</script>

<template>
  <div class="bg-green-950 text-neutral-50 w-screen h-screen p-4 flex flex-col gap-8">
    <AddForm @addPerson="addPerson" @jumpscare="jumpScare"/>
    <div class="c-overlay hidden absolute h-screen w-screen top-0 left-0"/>
    <PersonList :people="people" @removePerson="removePerson"/>
  </div>
</template>

<style>
  .c-overlay {
    background: url('./assets/jelle.png') no-repeat center center;
  }
</style>