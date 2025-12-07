export default defineEventHandler(async (event)=>{
    const body = await readBody(event);
    console.log("<<<<<<<<<<<<<<Hi there>>>>>>>>>>>>>>>>", typeof body, body.email, body.password,);
    
    if(!body.email || !body.password)
        throw createError({
            statusCode: 400,
            statusMessage: 'Error in email or password. Check it'
        });

    return {
        name: 'Foo Bar',
        email: body.email,
        success: true
    };
});