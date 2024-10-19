<script setup>
    import { watch } from 'vue'
    const props = defineProps({
        people: Array,
        index: Number
    })

    let person
    watch(() => {
        person = props.people[props.index]
    })

    const emit = defineEmits(['removePerson', 'manageExceptions'])

    function onClickRemove($event) {
        emit('removePerson', $event)
    }

    function onClickManageExceptions() {
        emit('manageExceptions', props.index, person.exceptions && [...person.exceptions, 'exception '+person.exceptions.length] || ['exception 0']) //TODO: Add actual persons instead of 'exception'
    }

    function onClickRemoveException(index) {
        person.exceptions.splice(index, 1)
    }
</script>

<template>
    <div class="relative h-full">
        <section class="bg-red-800 p-4 rounded-lg flex-col gap-3 relative z-10">
            <section class="w-full gap-2">
                <span class="w-20 h-20 rounded-lg bg-red-950" />
                <section class="person-card-header flex-col gap-2 justify-between py-1">
                    <section class="justify-between items-center">
                    <h3 class="text-2xl leading-none">
                        {{ person && person.name }}
                        </h3>
                        <button 
                            class="opacity-85 hover:opacity-100 hover:text-lg ease-in-out duration-300 flex justify-center items-center w-5 h-5"
                            @click="onClickRemove"
                        >
                        <font-awesome-icon :icon="['far', 'trash-can']" />
                    </button>
                    </section>
                    <section class="justify-between items-center">
                        <p class="opacity-85 leading-none">Can buy for everyone but:</p>
                        <button
                            class="btn-add-exception w-fit min-w-fit bg-neutral-200/25 py-1 px-2 rounded-full opacity-85 hover:bg-white hover:text-red-950 ease-in-out duration-300 text-sm"
                            @click="onClickManageExceptions"
                        >
                            Manage exceptions
                        </button>
                    </section>
                </section>
            </section>
            <ul 
                class="flex flex-col gap-1"
                v-if="person && person.exceptions && person.exceptions.length > 0"
            >
                <li
                    v-for="(exception, i) in person.exceptions"
                    :key="i"
                    class="bg-neutral-200/10 p-2 rounded-lg flex justify-between items-center"
                >
                    <p>{{exception}}</p>
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
    .person-card-header {
        width: calc(100% - 5.5rem);
    }
</style>