export class ApiError extends Error {
    status:number;
    code:string|undefined;

    constructor(statusCode:number, message:string, code?:string){
        super(message);
        this.status = statusCode;
        this.name = "Api Error"
        this.code = code
    }
}