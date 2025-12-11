<script lang="ts" setup>
import { useBookStore } from '~/store/book.store'
import { FiltersOfBooks, SearchByEnum } from '~~/shared/constants/books/search-books.contants'
import type { SearchBy } from '~~/shared/types/books/filter'
const {
    setSearchesBy,
    setFilters,
    getFilters
} = useBookStore()
const filterState = ref<string>('q')
const model = ref<Array<string>>([])

const handleChangeFilters = () => {
    console.log("models===>", model.value);
    
    
    const searches: Array<SearchBy> = []
    model.value.forEach(m => {
        const filteredByNot = getFilters.search?.filter(v=>v.nameSearch !== m);//brute force :(
        switch (m) {
            case SearchByEnum.Author:
                searches.push({
                    nameSearch: SearchByEnum.Author,
                    value: '',
                });
                break;
            case SearchByEnum.Q:
                searches.push({
                    nameSearch: SearchByEnum.Q,
                    value: ''
                });
                break;
            case SearchByEnum.Title:
                searches.push({
                    nameSearch: SearchByEnum.Title,
                    value: ''
                });
                break;
            case SearchByEnum.Language:
                searches.push({
                    nameSearch: SearchByEnum.Language,
                    value: ''
                });
                break;
            default:
                searches.push({
                    nameSearch: SearchByEnum.Q,
                    value: ''
                });
                break;
        }
        if(filteredByNot !== undefined) {
            filteredByNot.forEach(f=>{
                searches.push(f)
            })
        }
    })
    console.log("searches add aded", searches);
    
    setFilters({
        search: searches
    })
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