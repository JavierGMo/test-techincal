import { baseRequest } from "../base.service"

interface DataLogin {
    name: string
    email: string
    success: boolean
}

export const loginService = async (email: string, password: string) => {
    try{
        const data = await baseRequest<DataLogin>({
            path: '/api/login',
            method: 'POST',
            body: {
                email,
                password,
            }
        });


        return data;

    }catch(e){
        throw e;
    }
}