<script lang="ts" setup>
    import type { InputHTMLAttributes } from 'vue';

    interface InputProps extends /* @vue-ignore */ InputHTMLAttributes{

    }
    const props = defineProps<InputProps>();
    const className = `input ${props.class}`;
</script>

<template>
    <input :class="className">
</template>