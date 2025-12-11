<script lang="ts" setup>
import { useBookStore } from '~/store/book.store'
import { FiltersOfBooks, SearchByEnum } from '~~/shared/constants/books/search-books.contants'
import type { SearchBy } from '~~/shared/types/books/filter'
const {
    setSearchesBy,
    setFilters,
    getFilters,
    setSearcheasFilter
} = useBookStore()
const filterState = ref<string>('q')
const model = ref<Array<string>>([])

const handleChangeFilters = () => {
    console.log("models===>", model.value);
    
    
    const searches: Array<SearchBy> = []
    let searchBy: SearchBy = {
        nameSearch: SearchByEnum.Q,
        value: ''
    };
    model.value.forEach(m => {
        // const filteredByNot = getFilters.search?.filter(v=>v.nameSearch !== m);//brute force :(
        switch (m) {
            case SearchByEnum.Author:
                searchBy.nameSearch = SearchByEnum.Author;
                searchBy.value = '';
                searches.push({
                    nameSearch: SearchByEnum.Author,
                    value: '',
                });
                break;
            case SearchByEnum.Q:
                searchBy.nameSearch = SearchByEnum.Q;
                searchBy.value = '';
                searches.push({
                    nameSearch: SearchByEnum.Q,
                    value: ''
                });
                break;
            case SearchByEnum.Title:
                searchBy.nameSearch = SearchByEnum.Title;
                searchBy.value = '';
                searches.push({
                    nameSearch: SearchByEnum.Title,
                    value: ''
                });
                break;
            case SearchByEnum.Language:
                searchBy.nameSearch = SearchByEnum.Language;
                searchBy.value = '';
                searches.push({
                    nameSearch: SearchByEnum.Language,
                    value: ''
                });
                break;
            default:
                searchBy.nameSearch = SearchByEnum.Q;
                searchBy.value = '';
                searches.push({
                    nameSearch: SearchByEnum.Q,
                    value: ''
                });
                break;
        }
        
    })
    console.log("searches add aded", searches);
    // setSearcheasFilter(searchBy);
    // setFilters({
    //     search: searches
    // })
    setSearchesBy(searches);
}

</script>


<template>
    <div>
        <template v-for="filter in FiltersOfBooks">
            <label :for="`${filter.label}`">{{ filter.label }}</label>
            <input type="checkbox" v-model="model" :value="filter.value" @change="handleChangeFilters" />
        </template>
    </div>
</template>