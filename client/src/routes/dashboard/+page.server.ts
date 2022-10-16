import { DEV_SERVER, ENV, PROD_SERVER } from "$env/static/private"
import { redirect, type Actions, type ServerLoad } from "@sveltejs/kit"

const server = ENV == 'dev' ? DEV_SERVER : PROD_SERVER

export const load : ServerLoad = ({ locals, url }) =>
{
  const user = locals.user

  if(!user)
  {
    throw redirect(307, `/login?redirectTo=${url.pathname}`)
  }

  return {
    user : locals.user,
    token : locals.token
  }
}

export const actions : Actions = {
  createUser : async ({request, locals , fetch}) =>
  {
    const form = await request.formData()
    const name = form.get('name')
    const email = form.get('email')
    const password = form.get('password')
    const user = {
      name,
      email,
      password
    }

    const token = locals.token

    const res = await fetch(`${server}/users`,{
      method : "POST",
      body : JSON.stringify({user}) ,
      headers : {
        'Content-Type' : 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })

    const resData = await res.json()

    const created = resData.created
    console.log( created );

    return{
      success : created
    }

  },

  createCategory : async ({ request, locals, fetch}) =>
  {
    const form = await request.formData()
    const title = form.get('title')
    const category = {
      title
    }

    const token = locals.token

    const res = await fetch(`${server}/categories`,{
      method : 'POST',
      body : JSON.stringify({category}),
      headers : {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      }
    })

    const resData = await res.json()

    return{
      success : resData.created
    }
  },

  editCategory : async ({request,locals,fetch}) =>
  {
    const form = await request.formData()
    const title = form.get('title')
    const id = form.get('id')
    const category = {
      title,
      id
    }
    
    const token = locals.token
    const res = await fetch(`${server}/categories/${id}`,{
      method : 'PUT',
      body : JSON.stringify({category}),
      headers : {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      }
    })
    const resData = await res.json()

    return{
      success : resData.updated
    }
  },

  createMovie : async ({ request, locals, fetch}) =>
  {
    const form = await request.formData()
    const title = form.get('title')
    const description = form.get('description')
    const rate = form.get('rate')
    const image = form.get('image')
    const category = form.get('category')
    const movie = {
      title,
      description,
      rate,
      image,
      category
    }

    const token = locals.token

    const res = await fetch(`${server}/movies`,{
      method : 'POST',
      body : JSON.stringify({movie}),
      headers : {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      }
    })

    const resData = await res.json()

    return{
      success : resData.created
    }
  },

  editMovie : async ({request,locals,fetch}) =>
  {
    const form = await request.formData()
    const id  = form.get('id')
    const title = form.get('title')
    const description = form.get('description')
    const rate = form.get('rate')
    const image = form.get('image')
    const category = form.get('category')
    const movie = {
      title,
      description,
      rate,
      image,
      category
    }

    
    const token = locals.token
    const res = await fetch(`${server}/movies/${id}`,{
      method : 'PUT',
      body : JSON.stringify({movie}),
      headers : {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${token}`
      }
    })
    const resData = await res.json()

    return{
      success : resData.updated
    }
  }
} 