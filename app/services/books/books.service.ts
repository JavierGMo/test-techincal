import type { ResponseBooks } from "~~/shared/types/books/book";
import { baseRequest } from "../base.service"

export const getBooks = async (url: string) => {
    try {
        const data = await $fetch<ResponseBooks>(url);
        return data;
    } catch (error) {
        throw error;
    }
    
    

}