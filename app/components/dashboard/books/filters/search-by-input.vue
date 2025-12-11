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

    const s = ref('')

    const handleSomeInputs = (search: string, event: any) => {
        console.log("huevosdasdhas jd", getSearchesBy.value, event.target?.value);
        
        if(!event.target?.value) return;
        console.log("value");
        
        booksStore.setSearcheasFilter({
            nameSearch: search,
            value: event.target?.value
        });
    }
    const handle = (e: any) => {

        console.log("new valuedasdg ahsd", e);
    }
    watch(getSearchesBy, (newValue) => {
        if(!Array.isArray(newValue)) return;
        inputsByFilter.value = newValue
    })
    
</script>

<template>
    <div>
        
        <template v-for="search in getSearchesBy">
            <VInput
                :id="search.nameSearch"
                :name="search.nameSearch"
                v-model="search.value"
                @input="(e)=>handleSomeInputs(search.nameSearch, e)"
                :placeholder="`Search by ${search.nameSearch}`"
            />
        </template>
    </div>
</template>