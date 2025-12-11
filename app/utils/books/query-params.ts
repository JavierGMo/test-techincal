import type { FilterSearchBook, SearchBy, SortBy, SortProps } from "~~/shared/types/books/filter";


export const generateSortBy = (sorts: Array<SortProps>) => {
    let querySort = ``;
    const lenSorts = sorts.length-1;
    sorts.forEach((sort, idx)=>{
        if(idx === lenSorts) {
            querySort += `${sort.field} ${sort.sortBy}`;
            return;
        }
        querySort += `${sort.field} ${sort.sortBy},`;
    })

    return querySort
}

export const generateSearchBy = (searchs: Array<SearchBy>) => {
    let querySort = ``;
    const lenSearchs = searchs.length-1;
    searchs.forEach((search, idx)=>{
        if(idx === lenSearchs) {
            querySort += `${search.nameSearch}=${search.value}`;
            return;
        }
        querySort += `${search.nameSearch}=${search.value}&`;
    })

    return querySort
}

export const ifThereURL = (url: string, newSegment: string) => {
    if(!url) return `${newSegment}&`;
    return newSegment
}

export const createQueryParams = (filters: FilterSearchBook) => {
    console.log("filters)====> are creating...", filters);
    
    let fullQueryParam = ``;
    if(filters.search) fullQueryParam += ifThereURL(fullQueryParam, `${generateSearchBy(filters.search)}`);
    if(filters.limit && filters.page) fullQueryParam += ifThereURL(fullQueryParam, `page=${filters.page}&limit=${filters.limit}`);
    if(filters.sort) fullQueryParam += ifThereURL(fullQueryParam, `sort=${generateSortBy(filters.sort)}`);

    if(fullQueryParam) fullQueryParam = `?${fullQueryParam}`

    return fullQueryParam;

}