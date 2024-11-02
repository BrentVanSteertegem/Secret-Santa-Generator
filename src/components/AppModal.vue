<script setup>
    const props = defineProps({
        size: 'full' || 'big' || undefined,
        clickToClose: Boolean || undefined
    })

    const emit = defineEmits(['close'])

    function onScreenClick() {
        if (!props.clickToClose) return
        closeModal()
    }

    function closeModal() {
        emit('close')
    }
</script>

<template>
    <div 
        class="p-8 fixed top-0 left-0 w-screen h-screen bg-black/25 z-50 flex items-center justify-center"
        @click="onScreenClick"
    >
        <div 
            class="p-4 rounded-3xl bg-white flex flex-col gap-4 justify-between items-center relative"
            :class="props.size === 'full' ? 'w-full h-full' :  (props.size ==='big' && 'w-3/4 h-3/4')"
        >
            <button
                v-if="!props.clickToClose"
                @click="closeModal"
                class="absolute top-4 right-4 font-bold text-xl h-9 w-9 text-red-800 hover:text-red-600 hover:text-2xl ease-in-out duration-300 leading-none hover:leading-none"
            >
                &#x2715;
            </button>
            <slot />
            <p 
                v-if="props.clickToClose"
                class="text-red-800 font-bold"
            >
                Click anywhere to close the modal
            </p>
        </div>
    </div>
</template>