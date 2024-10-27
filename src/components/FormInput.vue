<script setup>
    import { defineModel, ref } from 'vue'
    
    const model = defineModel({
        prop: 'model',
        event: 'input',
    })

    const props = defineProps({
        type: 'text' || "email",
        label: String || null,
        placeholder: String || null,
        disabled: Boolean || null,
        errors: Array || null,
        warnings: Array || null,
    })

    const emit = defineEmits(['keypress'])

    const showWarning = ref(false)
    const showError = ref(false)

    function onKeyPress($event) {
        emit('keypress', $event)
    }

    function mouseEnterWarning() {
        showWarning.value = true
    }

    function mouseLeaveWarning() {
        showWarning.value = false
    }

    function mouseEnterError() {
        showError.value = true
    }

    function mouseLeaveError() {
        showError.value = false
    }
</script>
<template>
    <div class="flex flex-col">
        <label
            v-if="props.label"
            for="name"
            class="font-bold"
        >
          {{props.label}}
        </label>
        <div class="relative">
            <input
            :type="props.type || 'text'"
            v-model="model"
            :placeholder="props.placeholder || ''"
            @keypress="onKeyPress"
            :disabled="props.disabled || false"
            class="w-60 bg-neutral-50 text-red-900 p-2 rounded-lg text-center focus:outline-none placeholder:text-red-950/25 disabled:bg-neutral-200/25 relative" 
            />
            <span 
                v-if="props.warnings && props.warnings.length > 0 && (!props.errors || props.errors.length === 0)"
                class="absolute top-3 right-2 bg-orange-400 rounded-lg leading-none w-5 h-5 flex justify-center items-center p-0"
                @mouseenter="mouseEnterWarning"
                @mouseleave="mouseLeaveWarning"
            >
                !
            </span>
            <span 
                v-if="showWarning"
                class="absolute top-11 right-0 p-2 rounded-lg z-10 w-60 bg-orange-400"
            >
                {{ props.warnings[0] }}
            </span>
            <span 
                v-if="props.errors && props.errors.length > 0"
                class="absolute top-3 right-2 bg-red-800 rounded-lg leading-none w-5 h-5 flex justify-center items-center p-0"
                @mouseenter="mouseEnterError"
                @mouseleave="mouseLeaveError"
            >
                !
            </span>
            <span 
                v-if="showError"
                class="absolute top-11 right-0 p-2 rounded-lg z-10 w-60 bg-red-800"
            >
                {{ props.errors[0] }}
            </span>
            <!-- <span 
                v-if="props.errors && props.errors.length > 0"
                class="absolute top-2 right-2 text-black"
            >
                {{ props.errors[0] }}
            </span> -->
        </div>
    </div>
</template>