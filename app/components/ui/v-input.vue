<script lang="ts" setup>
    import type { InputHTMLAttributes } from 'vue';

    interface InputProps extends /* @vue-ignore */ InputHTMLAttributes{

    }
    const props = defineProps<InputProps>();
</script>

<template>
    <input>
</template>