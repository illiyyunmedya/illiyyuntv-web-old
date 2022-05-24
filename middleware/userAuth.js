import Cookie from 'js-cookie'

export default function (context) {
    if (process.client) {

        const userAuth = Cookie.get("acsess_token")

        if (!userAuth) {
  
            context.redirect("/")
  
        }
        

    } else {

        
        const userAuth = context.req.headers.cookie.split(";").find(c => c.trim().startsWith("acsess_token="))

        if (!userAuth) {
  
            context.redirect("/")
  
        }


    }

}
