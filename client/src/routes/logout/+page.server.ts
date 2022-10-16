import { redirect, type ServerLoad } from "@sveltejs/kit";

export const load : ServerLoad = ({cookies}) =>
{
  // cookies.delete('token')
  cookies.set('token','',{
    path : '/',
    expires : new Date(0)
  })
  throw redirect(307,'/')
}