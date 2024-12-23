"use server";
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';

// User Session
export async function getSession() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('sessionId');

  if (sessionCookie) {
    return { sessionId: sessionCookie.value };
  } else {

    const newSessionId = uuidv4();

    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 10);


    cookieStore.set('sessionId', newSessionId, {
      httpOnly: true,
      path: '/',
      expires: expirationDate, 
    });

    return { sessionId: newSessionId };
  }
}