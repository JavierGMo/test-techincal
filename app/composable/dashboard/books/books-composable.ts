import type { ResponseBooks } from "~~/shared/types/books/book"

interface UseQueryParamsBooks {
    limit?: number
    page?: number
    query?: string
    sort?: Array<string>

}

interface UseBooksParams{
    queryParam: string
}


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



export const useBooks = ({ queryParam }: UseBooksParams) => {
    const url = 'https://openlibrary.org/search.json'
    
    const urlToRefetch = ref(`${url}?${queryParam}`)
    const { data, execute, error } = useFetch<ResponseBooks>(urlToRefetch, {
        immediate: false
    });
    

    watch(urlToRefetch, ()=>{
        console.log(">>>watcher");
        
        execute()
    })

    const setQueryParam = (query: string) => {
        urlToRefetch.value = query;
    };

    return {
        data,
        error,
        setQueryParam
    }
    
    
};

