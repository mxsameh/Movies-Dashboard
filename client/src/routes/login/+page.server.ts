import { ENV, DEV_SERVER, PROD_SERVER } from "$env/static/private";
import { redirect, type Actions } from "@sveltejs/kit";

const server = ENV == 'dev' ? DEV_SERVER : PROD_SERVER

export const actions : Actions = {

  // LOGIN
  default : async ({ request, cookies, url }) => {
    // Get user login data
    const form = await request.formData()

    const user = {
      email : form.get('email'),
      password : form.get('password')
    }

    // Authenticate user
    const res = await fetch(`${server}/users/auth`,{
      method : "POST",
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({user})
    }) 

    const data = await res.json()
    
    const isAuthenticated = data.authenticated
    const token = data.token

    if(isAuthenticated)
    {
      cookies.set('token',token,{
        path : '/',
        httpOnly : true,
        sameSite : 'strict',
        maxAge : 60 * 60 * 24 * 30
      })

      const path = url.searchParams.get('redirectTo') || '/dashboard'
      throw redirect(307,`${path}`)
    }

  }
}
