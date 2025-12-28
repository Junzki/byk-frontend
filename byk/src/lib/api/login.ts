'use server';

import { z } from 'zod';
import { getClient, setAuthToken } from "@/lib/api/client";
import { redirect } from "next/navigation";
import { cookies } from "next/dist/server/request/cookies";


const LoginSchema = z.object({
  username: z.email("username must be a valid email").min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
})


export interface LoginState {
  success: boolean | null;
  message?: string;
}


export async function doLogin(currentState: LoginState, formData: FormData) {
  const cookieStore = await cookies();

  const username = formData.get('username')?.toString() || '';
  const password = formData.get('password')?.toString() || '';

  const result = LoginSchema.safeParse({ username,  password });
  if (!result.success) {
    return {
      success: false,
      message: result.error.message
    };
  }

  const { data, error } = await getClient().POST('/api/v1/accounts/login', {
    body: {
      username,
      password,
      tenant: 'default',
    }
  });
  
  if (error) {
    return {
      success: false,
      message: "Username of password is invalid",
    };
  }

  const token = data?.access_token;
  if (token) {
    cookieStore.set("access_token", token, { httpOnly: true, path: "/" });

    redirect('/');
  }

  return {
    success: false,
    message: "Username of password is invalid",
  };
}
