interface BaseRequestParams {
    path: string,
    body?: Object
    method?: "GET" | "HEAD" | "PATCH" | "POST" | "PUT" | "DELETE" | "CONNECT" | "OPTIONS" | "TRACE" | "get" | "head" | "patch" | "post" | "put" | "delete" | "connect" | "options" | "trace"
}

export const baseRequest = async <T>({
    path,
    body,
    method = 'GET'
}: BaseRequestParams) => {
    console.log("body", body ? JSON.stringify(body) : undefined);
    const request: T = await $fetch(path, {
        method,
        body: body ? body : undefined,
    });

    console.log("req", request);

    return request;
    
}