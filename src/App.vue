<script setup>
  import { onMounted, ref } from 'vue'
  import './styles/index.css'
  import AddForm from './components/AddForm.vue'
  import PersonList from './components/PersonList.vue'
  
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
    if (people.value.length < 2) {
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
          if (tries < 2) {
            tries++
          } else {
            window.alert('Could not generate list')
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

  const jumpScareTrigger = 'jelle'
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
  <div class="bg-green-950 text-neutral-50 w-screen h-screen-full min-h-screen flex justify-center">
    <div class="c-overlay hidden absolute h-screen w-screen top-0 left-0 z-30"/>
    <div class="max-w-screen-2xl w-full flex flex-col gap-8 p-4">
      <div class="flex flex-col gap-4 items-center">
        <AddForm
          :people="people"
          :jumpScareTrigger="jumpScareTrigger"
          @addPerson="addPerson"
          @jumpscare="jumpScare"
        />
        <button
          @click="generateList"
          class="w-60 sm:w-[408px] bg-red-800 border border-neutral-100/70 p-2 rounded-lg hover:bg-red-700 hover:border-white ease-in-out duration-300"
        >
          Generate list
        </button>
   
      </div>
      <PersonList
        :people="people"
        :generatedList="generatedList"
        @removePerson="removePerson"
        @manageExceptions="manageExceptions"
      />
    </div>
  </div>
</template>

<style>
  .c-overlay {
    background: url('./assets/jelle.png') no-repeat center center;
  }
</style>