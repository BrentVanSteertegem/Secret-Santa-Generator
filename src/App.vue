<script setup>
  import { onMounted, ref } from 'vue'
  import './styles/index.css'
  import AddForm from './components/AddForm.vue'
  import PersonList from './components/PersonList.vue'
  import ReviewList from './components/ReviewList.vue'
  import AppModal from './components/AppModal.vue'

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
  const errors = ref([])
  let isReviewing = ref(false)

  function addPerson(person) {
    people.value.push(person)
  }

  function removePerson(index) {
    const peopleCopy = people.value
    peopleCopy.forEach(person => {
      if (person.exceptions && person.exceptions.includes(people.value[index])) {
        person.exceptions.splice(person.exceptions.indexOf(people.value[index]), 1)
      }
    })
    peopleCopy.splice(index, 1)
    people.value = [...peopleCopy]
  }

  function manageExceptions(name, exceptions) {
    people.value[`${name}`].exceptions = exceptions
  }

  function toggleReviewList() {
    isReviewing.value = !isReviewing.value
  }

  function generateList() {
    if (generatedList.value.length > 0) {
      generatedList.value = []
      return
    }
    if (people.value.length < 2) {
      errors.value.push('Need at least 2 people to generate list')
      return
    }

    const sortedPeople = [...people.value].sort((a,b) => {
      return (b.exceptions && b.exceptions.length || 0) - (a.exceptions && a.exceptions.length || 0)
    })
    
    let success = false
    let failed = false
    let tries = 0
    while (!success && !failed) {
      const list = []
      const remainingPeople = [...sortedPeople]
      sortedPeople.forEach(person => {
        const availablePeople = remainingPeople.filter(p => p.email !== person.email && (person.exceptions ? !person.exceptions.includes(p.email) : true))
        if (!availablePeople || availablePeople.length === 0) {
          if (tries < 30) {
            tries++
          } else {
            errors.value.push('Unable to generate list, please adapt exceptions')
            failed = true
          }
          return
        }
        const randomPerson = availablePeople[Math.floor(Math.random() * availablePeople.length)]
        list.push({
          from: person,
          to: randomPerson
        })
        remainingPeople.splice(remainingPeople.indexOf(randomPerson), 1)
      })
      if (list.length === people.value.length) {
        success = true
        generatedList.value = [...list]
      } else {
        errors.value.push('Unable to generate list, please try again')
        failed = true
        return
      }
    }
  }

  function deleteGeneratedList() {
    generatedList.value = []
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

  function closeModal() {
    errors.value = []
  }
</script>

<template>
  <div class="c-app-bg w-screen h-screen fixed top-0 left-0 z-0">
    <ul aria-hidden="true">
      <li 
        class="c-snowflake text-white fixed before:content-['❅'] before:block "
        v-for="i in 12"
        :key="i"  
      ></li>
    </ul>
  </div>
  <div class="text-neutral-50 w-screen flex justify-center">
   <div class="c-overlay hidden absolute h-screen w-screen top-0 left-0 z-30"/>
    <div class="max-w-screen-2xl w-full flex flex-col gap-8 p-4">
      <div class="flex flex-col gap-4 items-center">
        <AddForm
          :people="people"
          :jumpScareTrigger="jumpScareTrigger"
          :disabled="isReviewing"
          @addPerson="addPerson"
          @jumpscare="jumpScare"
        />
        <button
          @click="toggleReviewList"
          class="w-60 bg-red-600 p-2 rounded-lg hover:bg-red-500  ease-in-out duration-300 z-10"
        >
          {{isReviewing ? 'Edit people' : 'Generate list'}}
        </button>
      </div>
      <PersonList
        v-if="!isReviewing"
        :people="people"
        @removePerson="removePerson"
        @manageExceptions="manageExceptions"
      />
      <div
        v-else
        class="flex justify-center flex-col gap-4 items-center"
      >
        <ReviewList
          :people="people"
        />
        <button
          v-if="people.length > 1"
          @click="generateList"
          class="w-60 bg-red-600 p-2 rounded-lg hover:bg-red-500  ease-in-out duration-300 relative"
        >
          Generate list
      </button>
      </div>
    </div>
  </div>
  <AppModal
    v-if="errors && errors.length > 0"
    :clickToClose="true"
    @close="closeModal" 
  >
    <p>{{errors && errors[0]}}</p>
  </AppModal>
  <AppModal
    v-if="generatedList && generatedList.length > 0"
    :size="'full'"
    @close="deleteGeneratedList"
  >
    <ul>
      <li
        v-for="(person, i) in generatedList"
        :key="i"
        class="flex justify-between"
      >
        <p>{{person.from.name}} buys for {{person.to.name}}</p>
      </li>
    </ul>
  </AppModal>
</template>

<style scoped>
  .c-app-bg {
    background: linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2) ), url('./assets/background.jpg') no-repeat center center ;
    background-size: cover;
  }
  .c-snowflake {
    text-shadow: 0 0 5px #000;
    top: -10%;
    user-select: none;
    -webkit-user-select: none;
    animation-name: snowflakes-shake;
    animation-duration: 3s;
    animation-timing-function: ease-in-out;
  }
  
  .c-snowflake, .c-snowflake:before {
    animation-iteration-count: infinite;
    animation-play-state: running;
  }
  
  .c-snowflake:before {
    animation-duration: 10s;
    animation-name: snowflakes-fall;
    animation-timing-function: linear;
  }

  @keyframes snowflakes-fall {
    0%{transform:translateY(0)}
    100%{transform:translateY(110vh)}
  }
  @keyframes snowflakes-shake {
    0%,100%{transform:translateX(0)}
    50%{transform:translateX(80px)}
  }
  
  .c-snowflake:nth-of-type(0) {
    left: 1%;
    animation-delay: 0s;
  }
  .c-snowflake:nth-of-type(0):before {
    animation-delay: 0s;
  }
  .c-snowflake:first-of-type {
    left: 10%;
    animation-delay: 1s;
  }
  .c-snowflake:first-of-type:before, .c-snowflake:nth-of-type(8):before {
    animation-delay: 1s;
  }
  .c-snowflake:nth-of-type(2) {
    left: 20%;
    animation-delay: 0.5s;
  }.c-snowflake:nth-of-type(2):before, .c-snowflake:nth-of-type(6):before {
    animation-delay: 6s;
  }.c-snowflake:nth-of-type(3) {
    left: 30%;
    animation-delay: 2s;
  }
  .c-snowflake:nth-of-type(11):before, .c-snowflake:nth-of-type(3):before {
    animation-delay: 4s;
  }
  .c-snowflake:nth-of-type(4) {
    left: 40%;
    animation-delay: 2s;
  }
  .c-snowflake:nth-of-type(10):before, .c-snowflake:nth-of-type(4):before {
    animation-delay: 2s;
  }
  .c-snowflake:nth-of-type(5) {
    left: 50%;
    animation-delay: 3s;
  }
  .c-snowflake:nth-of-type(5):before {
    animation-delay: 8s;
  }
  .c-snowflake:nth-of-type(6) {
    left: 60%;
    animation-delay: 2s;
  }
  .c-snowflake:nth-of-type(7) {
    left: 70%;
    animation-delay: 1s;
  }
  .c-snowflake:nth-of-type(7):before {
    animation-delay: 2.5s;
  }
  .c-snowflake:nth-of-type(8) {
    left: 80%;
    animation-delay: 0s;
  }
  .c-snowflake:nth-of-type(9) {
    left: 90%;
    animation-delay: 1.5s;
  }
  .c-snowflake:nth-of-type(9):before {
    animation-delay: 3s;
  }
  .c-snowflake:nth-of-type(10) {
    left: 25%;
    animation-delay: 0s;
  }
  .c-snowflake:nth-of-type(11) {
    left: 65%;
    animation-delay: 2.5s;
  }

  .c-overlay {
    background: url('./assets/jelle.png') no-repeat center center;
  }
</style>