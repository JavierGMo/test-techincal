<script lang="ts" setup>
    import TitleSort from './filters/title-sort.vue';
    import FoundBooks from './found-books.vue';
    import SearchBooks from './search-books.vue';
</script>
<template>
    <p class="text-lg lg:text-xl">Book searcher</p>
    <div>
        <SearchBooks/>
    </div>
    <FoundBooks/>
</template>