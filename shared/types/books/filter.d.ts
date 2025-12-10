export type SortBy = 'new' | 'old' | 'rating' | 'editions' | 'first_publish_year' | 'asc' | 'desc'

export interface SortProps {
    field: string
    sortBy: SortBy
}

export interface SearchBy {
    nameSearch: string
    value: string
}

export interface SortHumanProps {
    field: string
    sortBy: SortBy
    value: string
    label: string
}

export interface FilterSearchBook {
    page?: number
    limit?: number
    query?: string
    sort?: Array<SortProps>
    search?: Array<SearchBy>
}