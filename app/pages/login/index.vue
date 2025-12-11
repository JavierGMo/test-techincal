<script lang="ts" setup>
    import { ref } from 'vue';
    import VButton from '~/components/ui/v-button.vue';
    import VInput from '~/components/ui/v-input.vue';
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
            router.push('/dashboard');
        })
        .catch(e=>{
            error.value = {
                error: e,
                isThere: true
            }
        })
    }

    const handleEmail = (event: any) => {
        console.log("event0", event.target?.value);
        
        email.value = event?.target?.value;
    }

    const handlePassowrd = (event: any) => {
        console.log("event0", event.target?.value);
        
        password.value = event?.target?.value;
    }

    watch(email, ()=>{
        console.log("email", email.value);
        
    })
</script>
<template>
    <div>
        <div v-if="error.isThere">Error</div>
        <div class="flex justify-center">
            <p class="text-lg md:text-xl m-4">Sign in</p>
        </div>
        <form class="flex flex-col" >
            <label for="email" class="text-lg">Email: </label>
            <VInput v-model="email" @input="handleEmail" class="input mb-5" />
            <label for="email" class="text-lg">Password: </label>
            <VInput type="password" v-model="password" @input="handlePassowrd" class="input mb-5" />
            <VButton @click.prevent="handleLogin" type="button" class="btn btn-md btn-secondary">Sign In</VButton>
        </form>
    </div>
</template>