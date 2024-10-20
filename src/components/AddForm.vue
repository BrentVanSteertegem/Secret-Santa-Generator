<script setup>
  import { ref } from 'vue'

  const props = defineProps({
    people: Array,
    disabled: Boolean,
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
    emit('addPerson', { 
      name: name.value,
      avatar: Math.floor(Math.random() * 10)
    })
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
    <div class="flex max-sm:flex-col gap-2">
      <input
        type="text"
        v-model="name"
        @keypress="listenForChange"
        :disabled="props.disabled"
        class="w-60 border border-white bg-inherit p-2 rounded-lg text-center focus:outline-none disabled:bg-neutral-200/25" 
      />
      <button
        @click="addPerson"
        :disabled="props.disabled"
        class="w-60 sm:w-40 bg-red-800 disabled:bg-red-950 border border-neutral-100/70 p-2 rounded-lg [&:not([disabled])]:hover:bg-red-700 [&:not([disabled])]:hover:border-white ease-in-out duration-300"
      >
        Add
      </button>
    </div>
  </div>
</template>