<script lang="ts" setup>
    import { ref } from 'vue';
    import { loginService } from '~/services/auth/auth.service';
import type { ErrorFetch } from '~~/shared/types/ui/errors';
    const router = useRouter();
    const email = ref<string>('')
    const password = ref<string>('')
    const error = ref<ErrorFetch>({
        isThere: false,
        error: ''
    })

    const handleLogin = () => {
        loginService(email.value, password.value)
        .then(data=>{
            error.value = {
                error: '',
                isThere: false
            }
            console.log("data in success", data);
            router.push('/books');
        })
        .catch(e=>{
            error.value = {
                error: e,
                isThere: true
            }
        })
    }
</script>
<template>
    <div>
        <div v-if="error.isThere">Error</div>
        <form class="flex flex-col" >
            <UiInput :value="email" />
            <UiInput type="password" :value="password" />
            <UiButton @click.prevent="handleLogin" type="button">das</UiButton>
        </form>
    </div>
</template>