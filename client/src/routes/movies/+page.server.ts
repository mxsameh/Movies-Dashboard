import { redirect, type ServerLoad } from "@sveltejs/kit";

export const load : ServerLoad  = ({ locals, url }) =>
{
  const user = locals.user 

  if(user)
  {
    return {
      user
    }
  }
  else
  {
    throw redirect(307, `/login?redirectTo=${url.pathname}`)
  }
}