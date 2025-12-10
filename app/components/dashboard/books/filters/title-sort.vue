<script lang="ts" setup>
    import { useBookStore } from '~/store/book.store';
    import { SearchsSorts } from '~~/shared/constants/books/search-books.contants'
    import type { SortBy, SortProps } from '~~/shared/types/books/filter';
    const {setFilters, ...booksStore} = useBookStore()
    const {
        getFilters
    } = storeToRefs(booksStore)
    const selectedSort = ref<SortProps>({
        field: "title",
        sortBy: "asc"
    })

    const handleChange = (event: any) => {
        if(!event.target?.value) return;

        selectedSort.value.sortBy = event.target?.value;
        setFilters({
            ...getFilters.value,
            sort: [{ field: selectedSort.value.field, sortBy: selectedSort.value.sortBy }]
        })
    }



</script>

<template>
    <div class="">
        <label>Sort by title: </label>
        <select
            :value="selectedSort.sortBy"
            @change="handleChange"
        >
            <option v-for="sort in SearchsSorts" :value="sort.sortBy">{{ sort.label }}</option>
        </select>
    </div>
</template>