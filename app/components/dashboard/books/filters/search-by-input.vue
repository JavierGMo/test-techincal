<script lang="ts" setup>
import VInput from '~/components/ui/v-input.vue';
import { useBookStore } from '~/store/book.store';
import { SearchByEnum } from '~~/shared/constants/books/search-books.contants';
import type { SearchBy } from '~~/shared/types/books/filter';
import type { GeneralType } from '~~/shared/types/global';

    const booksStore = useBookStore()
    const { getSearchesBy } = storeToRefs(booksStore)
    const inputsByFilter = ref<Array<SearchBy>>([])
    const valueInputs = ref<GeneralType<SearchBy>>({
        [SearchByEnum.Title]: {
            nameSearch: SearchByEnum.Title,
            value: ""
        },
        [SearchByEnum.Author]: {
            nameSearch: SearchByEnum.Author,
            value: ""
        },
        [SearchByEnum.Language]: {
            nameSearch: SearchByEnum.Language,
            value: ""
        },
    })

    const handleSomeInputs = (search: string, event: any) => {
        console.log("huevosdasdhas jd", inputsByFilter.value);
        
        if(!event.target?.value) return;
        if(!Array.isArray(inputsByFilter.value)) return;
        console.log("value in multiple pr", valueInputs.value[search]);
        const copyInputs = [...inputsByFilter.value]
        //valueInputs.value[search].value = event.target.value;
        const foundInput = copyInputs.find(input=>input.nameSearch === search);
        const filtered = copyInputs.filter(input=>input.nameSearch!==search);
        const mapped = filtered.map<SearchBy>(m=>{
            return {
                nameSearch: m.nameSearch,
                value: m.value
            }
        })
        const value = foundInput === undefined ? event.target?.value : `${foundInput.value}${event.target?.value}`
        const currentSearch:SearchBy = { nameSearch: search, value }
        const allValues = [...mapped, currentSearch];
        console.log("allvalues====>", allValues);
        
        booksStore.setFilters({
            search: allValues
        })
        /*valueInputs.value = {
            ...valueInputs.value,
            [search]: { ...valueInputs.value[search], value: event.target.value }
        }
        const onlyValues = Object.values(valueInputs.value)
        console.log("only values", onlyValues);
        
        booksStore.setFilters({
            search: onlyValues
        })*/
    }

    watch(getSearchesBy, (newValue) => {
        if(!Array.isArray(newValue)) return;
        inputsByFilter.value = newValue
    })
    
</script>

<template>
    <div>
        <template v-for="search in inputsByFilter">
            <VInput
                :id="search.nameSearch"
                :name="search.nameSearch"
                v-model="search.value"
                
                :placeholder="`Search by ${search.nameSearch}`"
            />
        </template>
    </div>
</template>