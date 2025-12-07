import type { ResponseBooks } from "~~/shared/types/dashboard/book"

interface UseQueryParamsBooks {
    limit?: number
    page?: number
    query?: string
    sort?: Array<string>

}

interface UseBooksParams extends UseQueryParamsBooks{}


export const useQueryParamsBooks = (props: UseQueryParamsBooks) => {
    const queryAsString = ref('');
    const queryParam = ref<UseQueryParamsBooks>(props);
    const setProps = (props: UseQueryParamsBooks) => {
        queryParam.value = props;
    }
    watch(props, newProps => {
        queryAsString.value = `q=${newProps.query}&limit=${newProps.limit ?? 10}&page=${newProps.page ?? 0}`
    });


    return {
        queryAsString,
        setProps
    }

}



export const useBooks = (props: UseBooksParams) => {
    const url = 'https://openlibrary.org/search.json'
    const {  queryAsString } = useQueryParamsBooks(props)
    const urlToRefetch = ref(`${url}?${queryAsString.value}`)
    const { data, execute, error } = useFetch<ResponseBooks>(urlToRefetch, {
        immediate: false
    });

    watch(props, ()=>{
        execute()
    })

    return {
        data,
        error
    }
    
    
};

