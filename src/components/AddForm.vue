<script setup>
  import { ref, watch } from 'vue'
  import FormInput from './FormInput.vue'

  const props = defineProps({
    people: Array,
    disabled: Boolean,
    jumpScareTrigger: String
  })

  const emit = defineEmits(['addPerson', 'jumpscare'])
  
  const name = ref(null)
  const email = ref(null)
  let $nameInput
  let nameWarnings = []
  let nameErrors = []
  let $emailInput
  let emailErrors = []  

 watch(() => name.value, () => {
   nameWarnings = []
   nameErrors = []

   if (!name.value || name.value.trim() === '') {
     return nameErrors.push('Name is required')
   }
   
   if (checkIfNameExists()) {
     nameWarnings.push('This name is already in the list, we recommend changing it!')
   }
  })

  watch(() => email.value, () => {
    emailErrors = []

    if (!email.value || email.value.trim() === '') {
      return emailErrors.push('Email is required') //TODO: Validate email
    }

    if (checkIfEmailExists()) {
      return emailErrors.push('This email is already in the list')
    }
  })

  function addPerson() {
    if (checkForJumpscare()) {
      emit('jumpscare')
      if (checkIfNameExists()) {
        name.value = ''
        return
      }
    }

    if (nameErrors.length > 0 || emailErrors.length > 0) {
      return
    }

    emit('addPerson', { 
      name: name.value.trim(),
      email: email.value.trim(),
      avatar: Math.floor(Math.random() * 10)
    })
    name.value = null
    email.value = null
    focusName()
  }

  function checkIfNameExists() {
    return props.people.map(person => person.name).includes(name.value)
  }

  function checkIfEmailExists() {
    return props.people.map(person => person.email).includes(email.value)
  }

  function checkForJumpscare() {
    if (name.value && name.value.trim().toLowerCase() === props.jumpScareTrigger) {
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
          <FormInput 
            v-model="name"
            :type="'text'"
            :label="'Name:'"
            :placeholder="'Studarian'"
            @keypress="listenForNameChange"
            :disabled="props.disabled"
            :errors="nameErrors"
            :warnings="nameWarnings"
          />
          <FormInput 
            v-model="email"
            :type="'email'"
            :label="'Email:'"
            :placeholder="'studarian@studaro.com'"
            @keypress="listenForEmailChange"
            :disabled="props.disabled"
            :errors="emailErrors"
          />
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