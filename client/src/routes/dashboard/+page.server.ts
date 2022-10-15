import { redirect, type Actions, type ServerLoad } from "@sveltejs/kit";


export const load : ServerLoad = ({ locals }) =>
{
  return {
    user : locals.user,
    token : locals.token
  }
}

export const actions : Actions = {
  create : async ({request, locals , fetch}) =>
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

    const res = await fetch('http://localhost:3000/users',{
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

  }
} 