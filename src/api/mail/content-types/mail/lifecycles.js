module.exports = {
    async afterCreate(event){
        const {result: {to,subject,body}} = event;
        console.log("EMAIL DATA: ",to,subject,body)
        try{
            await strapi.plugins['email'].services.email.send({
                to:to,
                from:'koachassits1@gmail.com',
                subject:subject,
                text:body
            })
        }
        catch(e){
            console.log("EMAIL SENDING ERROR: ",e)
        }
    }
}