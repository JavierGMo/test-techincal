<script setup lang="ts">
    import VButton from '~/components/ui/v-button.vue';
    import VInput from '~/components/ui/v-input.vue';
    import { useBookStore } from '~/store/book.store';
    import TitleSort from './filters/title-sort.vue';
    import SearchBy from './filters/search-by.vue';
    import SearchByInput from './filters/search-by-input.vue';

    const query = ref<string>('')
    const bookStore = useBookStore();

    const { getSearchesBy, getFullQueryParam } = storeToRefs(bookStore)
    const notAreThereFilters = ref(true)
    const handleChangeSearch = (event: any) => {
        if(!event.target?.value) return;

        query.value = event.target.value;
    }

    const handleClickSearch = () => {
        bookStore.setCanSearch(true)
        const lenSearchersBy = getSearchesBy.value?.length === undefined ? 0 : getSearchesBy.value.length;
        console.log("getseachersvby===>", getSearchesBy.value);
        
        if(lenSearchersBy<=0){
            /*bookStore.setFilters({
                search: getSearchesBy.value
            })*/
            bookStore.setFilters({
                search: [{ nameSearch: 'q', value: query.value }]
            })
        }
        bookStore.setFullQueryParam();
        console.log("can search", getFullQueryParam.value);
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