<script setup>
    const props = defineProps({
        people: Array
    })
</script>

<template>
    <div
        class="w-fit min-w-[496px] max-w-[600px] self-center rounded-lg bg-red-600 z-10 p-4 flex flex-col gap-8"
    >
        <h2 class="text-lg font-bold text-center">Please review the list below before generating your secret Santas!</h2>
        <div>
            <section>
                <h3 class="w-1/2 text-center font-bold border-r text-lg pr-4 pb-4">Person</h3>
                <h3 class="w-1/2 text-center font-bold text-lg pl-4 pb-4">Can buy for everyone but</h3>
            </section>
            <ul>
                <li
                    v-for="(person, i) in props.people"
                    :key="i"
                    class="border-t flex"
                >
                    <div class="w-1/2 text-center border-r text-lg p-2 flex flex-col justify-center items-center">
                        <p class="overflow-hidden text-ellipsis w-full">{{person.name}}</p>
                        <p class="text-sm text-inherit/75 overflow-hidden text-ellipsis w-full">{{person.email}}</p>
                    </div>
                    <div class="w-1/2 text-center text-lg p-2 flex flex-col overflow-hidden text-ellipsis justify-center items-center">
                        <ul
                            v-if="person.exceptions && person.exceptions.length > 0"
                            class="flex flex-col gap-2 w-full"
                        >
                            <li
                                v-for="(exception, i) in person.exceptions"
                                :key="i"
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
                            </li>
                        </ul>
                        <span
                            v-else
                        >
                            -
                        </span>
                    </div>
                </li>
            </ul>
        </div>
        <p class="text-center">If the list is correct, proceed to click the button below.</p>
    </div>
</template>