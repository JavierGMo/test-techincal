export  interface BookDescription {
    cover_i?:            string;
    has_fulltext:       boolean;
    edition_count:      number;
    title:              string;
    author_name:        string[];
    first_publish_year: string;
    key:                string;
    ia:                 string[];
    author_key:         string[];
    public_scan_b:      boolean;
}

export interface ResponseBooks {
    numFound?: number
    start?: number
    numFoundExact?: boolean
    docs: BookDescription[]
}