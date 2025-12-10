import type { SortHumanProps, SortProps } from "~~/shared/types/books/filter";
import type { CheckBoxProps } from "~~/shared/types/ui/inputs";

export const SearchsSorts: Array<SortHumanProps> = [{
    field: "title",
    sortBy: "asc",
    label: "Titulo-Ascendente",
    value: "title"
}, {
    field: "title",
    sortBy: "desc",
    label: "Titulo-Descendente",
    value: "title"
}]

/**
 {
    label: "General (q)",
    value: "q"
}
 */
export const FiltersOfBooks: Array<CheckBoxProps> = [{
    label: "Title",
    value: "title"
}, {
    label: "Author",
    value: "author"
}, {
    label: "Language",
    value: "language"
}]

export const enum SearchByEnum  {
    Q = 'q',
    Title = 'title',
    Language = 'language',
    Author = 'author'
}

