import { defineStore } from 'pinia'

export const useBooksStore = defineStore('BooksStore', {
    state: () => {
        return {
            isAuthenticated: false,
            email: ''
        };
    },
    getters: {
        isAuthenticated: state=>state.isAuthenticated,
        authenticatedEmail: state=>state.email
    },
    actions: {
        authenticate(){
            this.$state.isAuthenticated = true;
        },
        unAuthenticate(){
            this.$state.isAuthenticated = false;
        },
        addAuthenticatedEmail(email: string) {
            this.$state.email = email;
        },
        removeAuthenticatedEmail(email: string) {
            this.$state.email = '';
        },
    }

});


