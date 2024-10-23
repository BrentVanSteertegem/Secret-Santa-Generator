<script setup>
  import { onMounted, ref } from 'vue'
  import './styles/index.css'
  import AddForm from './components/AddForm.vue'
  import PersonList from './components/PersonList.vue'
  import GeneratedList from './components/GeneratedList.vue'

  let $window
  onMounted(() => {
    $window = window
    $window.addEventListener('click', () => {
      const personCards = [...document.querySelectorAll('.c-person-card')]
      personCards.forEach((personCard, i) => {
        const $manageExceptionsModal = document.querySelectorAll('.c-exceptions-modal')[i]
        personCard.classList.remove('z-20')
        $manageExceptionsModal.classList.add('hidden')
        $manageExceptionsModal.classList.remove('flex')
        const $manageExceptionsButton = document.querySelectorAll('.c-btn-add-exception')[i]
        $manageExceptionsButton.classList.remove('bg-neutral-200')
        $manageExceptionsButton.classList.remove('text-red-950')
      })
    })

    setTimeout(() => {
      jumpScare()
    }, 5000)
  })  
  
  const people = ref([])
  const generatedList = ref([])

  function addPerson(person) {
    people.value.push(person)
  }

  function removePerson(name) {
    const peopleCopy = people.value
    peopleCopy.splice(people.value[`${name}`], 1)
    people.value = [...peopleCopy]
  }

  function manageExceptions(name, exceptions) {
    people.value[`${name}`].exceptions = exceptions
  }

  function generateList() {
    if (generatedList.value.length > 0) {
      generatedList.value = []
      return
    }
    if (people.value.length < 2) {
      window.alert('Need at least 2 people to generate list')
      return
    }

    const sortedPeople = [...people.value].sort((a,b) => {
      return (a.exceptions && a.exceptions.length || 0) - (b.exceptions && b.exceptions.length || 0)
    })
    
    let success = false
    let failed = false
    let tries = 0
    while (!success && !failed) {
      const list = []
      const remainingPeople = [...sortedPeople]
      sortedPeople.forEach(person => {
        const availablePeople = remainingPeople.filter(p => p.name !== person.name && (person.exceptions ? !person.exceptions.includes(p.name) : true))
        if (!availablePeople || availablePeople.length === 0) {
          if (tries < 20) {
            tries++
          } else {
            window.alert('Unable to generate list, please adapt exceptions')
            failed = true
          }
          return
        }
        const randomPerson = availablePeople[Math.floor(Math.random() * availablePeople.length)]
        list.push({
          from: person.name,
          to: randomPerson.name
        })
        remainingPeople.splice(remainingPeople.indexOf(randomPerson), 1)
      })
      if (list.length === people.value.length) {
        success = true
        generatedList.value = [...list]
      }
    }
  }

  let $overlay
  function setOverlay() {
    $overlay = document.querySelector('.c-overlay')
  }

  const jumpScareTrigger = process.env.VUE_APP_JUMPSCARE_TRIGGER
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
  <div class="c-app text-neutral-50 w-screen h-screen-full min-h-screen flex justify-center">
    <div class="c-overlay hidden absolute h-screen w-screen top-0 left-0 z-30"/>
    <div class="max-w-screen-2xl w-full flex flex-col gap-8 p-4">
      <div class="flex flex-col gap-4 items-center">
        <AddForm
          :people="people"
          :jumpScareTrigger="jumpScareTrigger"
          :disabled="generatedList.length > 0"
          @addPerson="addPerson"
          @jumpscare="jumpScare"
        />
        <button
          @click="generateList"
          class="w-60 sm:w-[408px] bg-red-800 border border-neutral-100/70 p-2 rounded-lg hover:bg-red-700 hover:border-white ease-in-out duration-300"
        >
          {{generatedList.length === 0 ? 'Generate list' : 'Edit people'}}
        </button>
   
      </div>
      <PersonList
        v-if="generatedList.length === 0"
        :people="people"
        @removePerson="removePerson"
        @manageExceptions="manageExceptions"
      />
      <GeneratedList
        v-else
        :generatedList="generatedList"
      />
    </div>
  </div>
</template>

<style>
  .c-app {
    background:  linear-gradient( rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6) ), url('./assets/background.jpg') no-repeat center center ;
    background-size: cover;
  }
  .c-overlay {
    background: url('./assets/jelle.png') no-repeat center center;
  }
</style>