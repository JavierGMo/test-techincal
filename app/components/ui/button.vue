<script lang="ts" setup>
import type { ButtonHTMLAttributes } from 'vue';

interface ButtonProps extends /* @vue-ignore */ ButtonHTMLAttributes {}
const props = defineProps<ButtonProps>()


</script>


<template>
    <button><slot></slot></button>
</template>