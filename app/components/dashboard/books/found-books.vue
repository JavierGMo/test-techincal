<script lang="ts" setup>
    import type { BookDescription } from '~~/shared/types/books/book';
    import BookItem from './book-item.vue';
    import { useBookStore } from '~/store/book.store';
    import Paginator from './paginator/paginator.vue';
    const booksStore = useBookStore()
    const { getOnlyBooks, getIsLoading, getErrorFetchBooks } = storeToRefs(booksStore)

</script>

<template>
    <div class="mt-4 grid  grid-cols-2 md:grid-cols-3 lg:grid-col-4 xl-grid-cols-6 gap-4 ml-4 mr-4">
        <BookItem
            v-for="book in getOnlyBooks"
            :img="book.cover_i"
            :title="book.title"
            :authors="book.author_name"
            :publish-year="book.first_publish_year"
        />
    </div>
    <div class="flex justify-center">
        <p v-if="getIsLoading" class="text-xl">Loading...</p>
    </div>
    <div class="flex justify-center">
        <p v-if="getErrorFetchBooks" class="text-xl">{{getErrorFetchBooks}}</p>
    </div>
    <div>
        <Paginator />
    </div>
</template>