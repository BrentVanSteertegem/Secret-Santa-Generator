<script setup>
    import { ref } from 'vue'
    import { sendEmail } from '@/scripts/sendEmail'
    import AppModal from './AppModal.vue'

    const props = defineProps({
        generatedList: Array
    })

    const emit = defineEmits(['close'])

    const emailsHaveBeenSent = ref(false)

    function deleteGeneratedList() {
        emit('close')
    }

    function sendMails() {
        props.generatedList.forEach((match, i) => {
           setTimeout(() => sendEmail(match.from, match.to), 1200 * i)
        })
        emailsHaveBeenSent.value = true
    }
</script>

<template>
    <AppModal
        v-if="!emailsHaveBeenSent"
        :size="'full'"
        @close="deleteGeneratedList"
    >
        <h2 class="pt-4 text-lg">Preview mail</h2>
        <div class="bg-[#09091B] text-white p-2 rounded-md w-[800px] h-[500px] flex flex-col items-center py-20 gap-20">
            <h2 class="text-red-600 text-3xl">Studaro Secret Santa</h2>
            <div class="flex w-full px-10">
                <div class="w-1/2 flex justify-center items-center">
                    <img
                    src="../assets/studaro-logo.png"
                    alt="Studaro logo"
                    class="w-48 h-48 aspect-square invert"
                    >
                </div>
                <div class="w-1/2 flex flex-col pt-4 gap-2">
                    <section class="flex gap-1 items-center">
                        <p class="leading-none">Hey</p>
                        <p
                            contenteditable="false"
                            class='text-2xl text-red-600 leading-none h-8'
                        >
                            you
                        </p>
                    </section>
                    <p>looks like you have to buy a gift for</p>
                    <p
                        contenteditable="false"
                        class='text-2xl text-red-600 py-2'
                    >
                        me
                    </p>
                    <p class="pt-4">Happy hunting!</p>
                </div>
            </div>
        </div>
        <section class="pb-4 flex gap-4">
            <button
                class="p-2 px-4 rounded-lg bg-neutral-300 hover:bg-neutral-200 ease-in-out duration-300"
                @click="deleteGeneratedList"
            >
                Cancel
            </button>
            <button
                class="p-2 px-4 rounded-lg bg-red-600 text-white hover:bg-red-500 ease-in-out duration-300"
                @click="sendMails"
            >
                Send mails
            </button>
        </section>
    </AppModal>
    <AppModal
        v-else
        :clickToClose="true"
        @close="deleteGeneratedList"
    > 
        <h3 class="text-lg">Emails have been sent!</h3>  
    </AppModal>
</template>