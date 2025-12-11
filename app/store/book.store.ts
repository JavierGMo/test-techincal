import { defineStore } from 'pinia'
import { getBooks } from '~/services/books/books.service';
import { createQueryParams } from '~/utils/books/query-params';
import type { BookDescription, ResponseBooks } from '~~/shared/types/books/book';
import type { FilterSearchBook, SearchBy } from '~~/shared/types/books/filter';




interface BookState {
    result: ResponseBooks
    filters: FilterSearchBook
    canSearch: boolean
    fullQueryParam: string
    errorFetchBooks: string
    searchesBy?: Array<SearchBy>
}

export const useBookStore = defineStore('BookStore', {
    state: (): BookState => {
        return {
            result: {
                docs: []
            },
            filters: {
                page: 0,
                limit: 10,
                search: []
            },
            canSearch: false,
            fullQueryParam: '',
            errorFetchBooks: '',
            searchesBy: []
        };
    },
    getters: {
        getOnlyBooks: state => state.result.docs,
        getAllResult: state => state.result,
        getFilters: state => state.filters,
        getFullQueryParam: (state) => {
            return state.fullQueryParam;
        },
        getCanSearch: state => state.canSearch,
        getErrorFetchBooks: state=>state.errorFetchBooks,
        getSearchesBy: state=>state.searchesBy
    },
    actions: {
        setFilters(filters: FilterSearchBook) {
            this.$state.filters = {
                ...this.$state.filters,
                ...filters
            };

            console.log("filters===>", this.$state.filters);
            
        },
        setBooks(books: Array<BookDescription>) {
            this.$state.result.docs = books;
        },
        setFullData(result: ResponseBooks) {
            this.$state.result = result;
        },
        setCanSearch(canSearch: boolean) {
            this.$state.canSearch = canSearch;
        },
        setFullQueryParam() {
            const query = createQueryParams(this.$state.filters);
            console.log(">>>>>fulll queyr", query);

            this.$state.fullQueryParam = query;
        },
        setSearchesBy(searchs: Array<SearchBy>){
            this.$state.searchesBy = searchs;
        },
        setSearcheasFilter(search: SearchBy){
            console.log("search in setSearcheasFilter *****", search, this.$state.filters.search === undefined, !search.value);
            
            //this.$state.searchesBy = searches
            if(this.$state.filters.search === undefined || !search.value) return;
            const filtered = this.$state.filters.search.filter(s=>s.nameSearch!==search.nameSearch);
            console.log("pase el pirmer filtro", filtered);
            
            console.log("pae los filtrossearch in setSearcheasFilter *****", search);
            const newSearches = [...filtered, search]
            this.$state.filters.search = newSearches
        },
        async fetchBooks() {
            const url = 'https://openlibrary.org/search.json'
            this.$state.errorFetchBooks = '';
            getBooks(`${url}${this.$state.fullQueryParam}`)
            .then(data=>{
                this.$state.result = data;
                this.$state.errorFetchBooks = '';
            })
            .catch(err=>{
                this.$state.errorFetchBooks = 'Vaya, parece que un error ocurrio, intente mas tarde.';
            });
        }
    },
});

