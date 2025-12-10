<script lang="ts" setup>
    import type { BookDescription } from '~~/shared/types/books/book';
    import BookItem from './book-item.vue';
    import { useBookStore } from '~/store/book.store';
    const booksStore = useBookStore()
    const { getOnlyBooks } = storeToRefs(booksStore)

</script>

<template>
    <div class="grid">
        <BookItem
            v-for="book in getOnlyBooks"
            :img="book.cover_i"
            :title="book.title"
            :authors="book.author_name"
            :publish-year="book.first_publish_year"
        />
    </div>
</template>