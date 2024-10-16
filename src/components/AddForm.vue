<script setup>
import { ref } from 'vue'

const props = defineProps({
  people: Array,
  jumpScareTrigger: String
})

const emit = defineEmits(['addPerson', 'jumpscare'])

const name = ref('')

function addPerson() {
  if (name.value.trim() === '') return
  if (checkForJumpscare()) {
    emit('jumpscare')
    if (checkIfPersonExists()) {
      name.value = ''
      return
    }
  }
  if (checkIfPersonExists()) {
    alert('This person is already in the list')
    return
  }
  emit('addPerson', { name: name.value })
  name.value = ''
}

function checkIfPersonExists() {
  return props.people.map(person => person.name).includes(name.value)
}

function checkForJumpscare() {
  if (name.value.trim().toLowerCase() === props.jumpScareTrigger) {
    return true
  }
  return false
}

function listenForChange($event) {
  if ($event.code === "Enter") {
    addPerson()
  }
}
</script>

<template>
  <div class="flex justify-center bg-inherit">
    <div class="flex flex-col w-60 gap-2">
      <input type="text" v-model="name" @keypress="listenForChange"
        class="border border-white bg-inherit p-2 rounded-lg text-center focus:outline-none" />
      <button @click="addPerson" class="border border-white p-2 rounded-lg">Add</button>
    </div>
  </div>
</template>