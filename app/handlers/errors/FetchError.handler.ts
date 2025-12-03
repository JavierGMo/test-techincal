export class FetchError<T> extends Error {
    public statusCode: number;
    public metadata?: T
    constructor(message: string, statusCode: number, metadata?: T){
        super(message);
        this.statusCode = statusCode;
        this.metadata = metadata
    }
}