export default defineEventHandler(async (event)=>{
    const { email, password } = await readBody(event);
    console.log("<<<<<<<<<<<<<<Hi there>>>>>>>>>>>>>>>>");
    
    if(!email || !password)
        throw createError({
            statusCode: 400,
            statusMessage: 'Error in email or password. Check it'
        });

    return {
        name: 'Foo Bar',
        email,
        success: true
    };
});