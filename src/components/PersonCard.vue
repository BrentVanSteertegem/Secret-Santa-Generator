<script setup>
    import { watchEffect } from 'vue'
    const props = defineProps({
        people: Array,
        index: Number
    })

    let person
    let $personCard
    let $addExceptionButton
    let $exceptionsModal
    watchEffect(() => {
        person = props.people[props.index]
        setPersonCard()
        setaddExceptionButton()
        setExceptionsModal()
    })

    const emit = defineEmits(['removePerson', 'manageExceptions'])

    function onClickRemove() {
        emit('removePerson', props.index)
    }

    function setPersonCard() {
        $personCard = document.querySelectorAll('.c-person-card')[props.index]
    }

    function setaddExceptionButton() {
        $addExceptionButton = document.querySelectorAll('.c-btn-add-exception')[props.index]
    }

    function setExceptionsModal() {
        $exceptionsModal = document.querySelectorAll('.c-exceptions-modal')[props.index]
    }

    function onClickAddExceptionButton(e) {
        if (!$personCard) setPersonCard()
        if (!$addExceptionButton) setaddExceptionButton()
        if (!$exceptionsModal) setExceptionsModal()
        e.stopPropagation()
        $personCard.classList.toggle('z-20')
        $addExceptionButton.classList.toggle('bg-neutral-200')
        $addExceptionButton.classList.toggle('text-red-950')
        $exceptionsModal.classList.toggle('hidden')
        $exceptionsModal.classList.toggle('flex')
    }
    
    function onClickException(e, targetPerson) {
        e.stopPropagation()

        if (person.exceptions && props.people.length - person.exceptions.length < 3 || props.people.length < 3) {
            return window.alert('Person needs at least available person to buy for')
        }

        emit('manageExceptions', props.index, person.exceptions && [...person.exceptions, targetPerson] || [targetPerson])
    }

    function onClickRemoveException(index) {
        person.exceptions.splice(index, 1)
        if ($addExceptionButton && $addExceptionButton.classList.contains('hidden')) {
            $addExceptionButton.classList.remove('hidden')
        }
    }
</script>

<template>
    <div class="c-person-card relative h-full">
        <section class="bg-red-600 p-4 rounded-lg flex-col gap-3 relative z-10">
            <section class="w-full gap-2">
                <div class="w-24 h-24 rounded-lg bg-red-700 flex justify-center items-center">
                    <img
                        class="w-5/6 h-5/6 object-contain rounded-lg"
                        :src="require(`@/assets/avatars/${person.avatar}.png`)"
                        alt="Avatar"
                    />
                </div>
                <section class="c-person-card-header flex-col gap-2 justify-between py-1">
                    <section class="justify-between">
                        <section class="c-person-card-details flex-col gap-1">
                            <h3 class="text-2xl leading-none text-ellipsis overflow-hidden w-full">
                                {{ person && person.name }}
                            </h3>
                            <p class="text-ellipsis overflow-hidden">{{person && person.email}}</p>
                        </section>
                        <button 
                            class="opacity-85 hover:opacity-100 hover:text-lg ease-in-out duration-300 flex justify-center items-center w-5 h-5"
                            @click="onClickRemove"
                        >
                        <font-awesome-icon :icon="['far', 'trash-can']" />
                    </button>
                    </section>
                    <section class="justify-between items-center">
                        <p
                            class="opacity-85 leading-none h-7 content-center"
                        >
                            Can buy for everyone
                            <span v-if="person && person.exceptions && person.exceptions.length > 0">but:</span>
                        </p>
                        <div class="relative">
                            <button
                                class="c-btn-add-exception w-fit min-w-fit bg-neutral-200/25 py-1 px-2 rounded-full opacity-85 hover:bg-white hover:text-red-950 ease-in-out duration-300 text-sm focus:text-neutral-50
                                focus:hover:text-red-950"
                                @click="onClickAddExceptionButton"
                            >
                                Add exception
                            </button>
                            <ul class="c-exceptions-modal hidden absolute z-20 opacity-100 bg-red-700 top-8 right-0 flex-col w-full rounded-lg ease-in-out duration-300">
                                <li
                                    v-for="(person, i) in people.filter((p, index) => index !== props.index && ((person.exceptions && !person.exceptions.includes(p)) ?? true))"
                                    :key="i"
                                >
                                    <button
                                        @click="(e) => onClickException(e, person)"
                                        class="py-1 px-2 hover:bg-white hover:text-red-950 ease-in-out duration-300 min-w-full text-left hover:rounded-lg overflow-hidden text-ellipsis w-full"
                                    >
                                        {{person.name}}
                                        <span class="text-sm text-inherit/75">({{person.email}})</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </section>
                </section>
            </section>
            <ul 
                class="flex flex-col gap-1 w-full"
                v-if="person && person.exceptions && person.exceptions.length > 0"
            >
                <li
                    v-for="(exception, i) in person.exceptions"
                    :key="i"
                    class="bg-neutral-200/10 p-2 rounded-lg flex justify-between items-center"
                >
                    <p class="overflow-hidden text-ellipsis w-full">
                        {{exception.name}}
                        <span
                            v-if="people.filter(p => p.name === exception.name).length > 1"
                            class="text-sm text-inherit/75"
                        >
                            ({{exception.email}})
                        </span>
                    </p>
                    <button 
                        @click="() => onClickRemoveException(i)"
                        class="opacity-85 hover:opacity-100 hover:text-lg ease-in-out duration-300 flex justify-center items-center w-5 h-5"
                    >
                        &#x2715;
                    </button>
                </li>
            </ul>        
        </section>
        <div class="absolute top-0 left-0 w-full h-full rounded-lg bg-red-950/40"></div>
    </div>
</template>

<style scoped>
    .c-person-card-header {
        width: calc(100% - 5.5rem);
    }

    .c-person-card-details {
        width: calc(100% - 2rem);
    }
</style>