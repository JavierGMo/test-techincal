<script lang="ts" setup>
import type { BookDescription } from '~~/shared/types/dashboard/book';
import BookItem from './book-item.vue';


    interface FoundBooksProps {
        books?: Array<BookDescription>
    }

    const {
        books = []
    } = defineProps<FoundBooksProps>();
</script>

<template>
    <div>
        <BookItem
            v-for="book in books"
            :img="book.cover_i"
            :title="book.title"
            :authors="book.author_name"
            :publish-year="book.first_publish_year"
        />
    </div>
</template>