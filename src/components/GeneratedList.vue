<script setup>
    const props = defineProps({
        generatedList: Array
    })
</script>

<template>
    <table
        class="w-[408px] self-center border rounded-lg bg-red-800"
    >
        <tr>
            <th class="w-1/2 text-center border-r text-lg p-2">From</th>
            <th class="w-1/2 text-center text-lg">To</th>
        </tr>
        <tr
            v-for="(match, i) in props.generatedList"
            :key="i"
            class="border-t"
        >
            <td class="w-1/2 text-center border-r text-lg p-2">{{match.from}}</td>
            <td class="w-1/2 text-center text-lg p-2">{{match.to}}</td>
        </tr>
    </table>
</template>