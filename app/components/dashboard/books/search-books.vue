<script setup lang="ts">
    import VButton from '~/components/ui/v-button.vue';
    import VInput from '~/components/ui/v-input.vue';
    import { useBookStore } from '~/store/book.store';
    import TitleSort from './filters/title-sort.vue';
    import SearchBy from './filters/search-by.vue';
    import SearchByInput from './filters/search-by-input.vue';
    import type { SearchBy as SearchByType } from '~~/shared/types/books/filter';

    const query = ref<string>('')
    const bookStore = useBookStore();

    const { getSearchesBy, getFullQueryParam, getFilters } = storeToRefs(bookStore)
    const notAreThereFilters = ref(true)
    const handleChangeSearch = (event: any) => {
        if(!event.target?.value) return;

        query.value = event.target.value;
    }

    const handleClickSearch = () => {
        bookStore.setCanSearch(true)
        const lenSearchersBy = getSearchesBy.value?.length === undefined ? 0 : getSearchesBy.value.length;
        console.log("getseachersvby===>", getSearchesBy.value);
        const currentSearchs: Array<SearchByType> = []
        if(lenSearchersBy<=0){
            bookStore.setFilters({
                search: [{ nameSearch: 'q', value: query.value }]
            })
        } else {
            getSearchesBy.value?.forEach(search=>{
                 const found = getFilters.value.search?.find(c=>c.nameSearch === search.nameSearch);
                console.log("in searching----->", found, search);
                
                if(found === undefined) return;
                currentSearchs.push(found);
            })
            console.log("full query in array", currentSearchs, getFilters.value.search);
            
            bookStore.setFilters({
                search: currentSearchs
            })
        }
        bookStore.setFullQueryParam();
        //bookStore.fetchBooks();
        
    };

    watch(getSearchesBy, ()=>{
        if(!Array.isArray(getSearchesBy.value)) return;
        console.log("dasdasda8878998798", getSearchesBy.value);
        
        if(getSearchesBy.value.length>0) {
            notAreThereFilters.value = false;
            return;
        }
        notAreThereFilters.value = true;
    })

</script>

<template>
    <div class="">
        <div class="flex flex-col">
            <VInput
                v-if="notAreThereFilters"
                placeholder="General search of books..."
                :value="query"
                @change="handleChangeSearch"
            />
            <SearchByInput />
        </div>
        <SearchBy />
        <TitleSort />
        <VButton @click.prevent="handleClickSearch">Buscar libro</VButton>
    </div>
</template>