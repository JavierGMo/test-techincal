<script lang="ts" setup>
    import { useBooks } from '~/composable/dashboard/books/books-composable';
import FoundBooks from './found-books.vue';
    import SearchBooks from './search-books.vue';

    const { data, error } = useBooks({

    });


</script>
<template>
    <SearchBooks/>
    <FoundBooks
        :books="data?.docs"
    />
</template>