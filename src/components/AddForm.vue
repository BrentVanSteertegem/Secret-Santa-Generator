<script setup>
  import { ref } from 'vue'

  const props = defineProps({
    people: Array,
    disabled: Boolean,
    jumpScareTrigger: String
  })

  const emit = defineEmits(['addPerson', 'jumpscare'])
  
  const name = ref('')
  const email = ref('')
  let $nameInput
  let $emailInput
  
  //TODO: Watch name and notify if already in the list => checkIfNameExists() => You might want to add change the name so it's more clear

  function addPerson() {
    if (name.value.trim() === '') return window.alert('no name')//TODO: Name required notification
    if (checkForJumpscare()) {
      emit('jumpscare')
      if (checkIfNameExists()) {
        name.value = ''
        return
      }
    }
    if (email.value.trim() === '') return window.alert('no email')// TODO: Email required notification
    //TODO: Validate email
    if (checkIfEmailExists()) {
      alert('This email is already in the list') // TODO: Add a proper notification
      return
    }
    emit('addPerson', { 
      name: name.value,
      email: email.value,
      avatar: Math.floor(Math.random() * 10)
    })
    name.value = ''
    email.value = ''
    focusName()
  }

  function checkIfNameExists() {
    return props.people.map(person => person.name).includes(name.value)
  }

  function checkIfEmailExists() {
    return props.people.map(person => person.email).includes(email.value)
  }

  function checkForJumpscare() {
    if (name.value.trim().toLowerCase() === props.jumpScareTrigger) {
      return true
    }
    return false
  }

  function listenForNameChange($event) {
    if ($event.code === "Enter") {
      focusEmail()
    }
  }

  function listenForEmailChange($event) {
    if ($event.code === "Enter") {
      addPerson()
    }
  }

  function focusName() {
    if (!$nameInput) $nameInput = document.querySelector('input[type="text"]')
    $nameInput.focus()
  }

  function focusEmail() {
    if (!$emailInput) $emailInput = document.querySelector('input[type="email"]')
    $emailInput.focus()
  }
</script>

<template>
  <div class="flex justify-center bg-inherit">
    <div class="flex flex-col gap-4 bg-red-600 p-4 rounded-lg z-10">
      <div class="flex flex-col gap-2">
        <div class="flex flex-col">
          <label
            for="name"
            class="font-bold"
          >
            Name:
          </label>
          <input
            type="text"
            v-model="name"
            placeholder="Studarian"
            @keypress="listenForNameChange"
            :disabled="props.disabled"
            class="w-60 border bg-inherit p-2 rounded-lg text-center focus:outline-none placeholder:text-neutral-200/90 disabled:bg-neutral-200/25" 
          />
        </div>
        <div class="flex flex-col">
          <label
            for="email"
            class="font-bold"
          >
            Email:
          </label>
          <input
            type="email"
            v-model="email"
            placeholder="studarian@studaro.com"
            @keypress="listenForEmailChange"
            :disabled="props.disabled"
            class="w-60 border bg-inherit p-2 rounded-lg text-center focus:outline-none placeholder:text-neutral-200/90 disabled:bg-neutral-200/25" 
          />
        </div>
      </div>
      <button
        @click="addPerson"
        :disabled="props.disabled"
        class="w-60 bg-green-700 disabled:bg-green-950 p-2 rounded-lg [&:not([disabled])]:hover:bg-green-600 [&:not([disabled])]:hover:border-white ease-in-out duration-300"
      >
        Add
      </button>
    </div>
  </div>
</template>