<script setup>
    const props = defineProps({
        size: 'full' || undefined,
    })

    const emit = defineEmits(['close'])

    function closeModal() {
        emit('close')
    }
</script>

<template>
    <div 
        class="fixed top-0 left-0 w-screen h-screen bg-black/25 z-50 flex items-center justify-center"
        @click="closeModal"
    >
        <div 
            class="p-8 rounded-xl bg-white flex flex-col gap-4 justify-between items-center"
            :class="props.size ==='full' && 'w-3/4 h-3/4'"
        >
            <slot />
            <p class="text-red-800 font-bold">Click anywhere to close the modal</p>
        </div>
    </div>
</template>