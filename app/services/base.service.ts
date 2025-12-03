import { FetchError } from "~/handlers/errors/FetchError.handler";

interface BaseRequestParams {
    path: string,
    body?: Object
    method?: string
}

export const baseRequest = async <T>({
    path,
    body,
    method = 'GET'
}: BaseRequestParams) => {
    const request = await fetch(path, {
        method,
        body: body ? JSON.stringify(body) : undefined,
    });

    if(request.status!==200) {
        const text = await request.text();
        throw new FetchError(text, request.status);
    }

    const data: T = await request.json();

    return data;
}