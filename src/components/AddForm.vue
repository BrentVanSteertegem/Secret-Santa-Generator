<script setup>
import { ref } from 'vue'

const emit = defineEmits(['addPerson', 'jumpscare'])

const name = ref('')

function addPerson() {
  emit('addPerson', { name: name.value })
  if (name.value.trim().toLowerCase() === 'jelle') {
    emit('jumpscare')
  }
  name.value = ''
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