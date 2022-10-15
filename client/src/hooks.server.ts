import type { Handle } from "@sveltejs/kit";
import { decodeToken } from "$lib/utils/jwt";

export const handle : Handle = async ({ event, resolve }) =>
{
    const token = event.cookies.get('token') || ''
    const user = decodeToken(token as string) as object

    if(user)
    {
      event.locals = {
        user,
        token
      }
    }
  
    return resolve(event)
}