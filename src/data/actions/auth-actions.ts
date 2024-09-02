'use server'

import { z, ZodError } from 'zod';
import { registerUserService } from '../services/auth-service';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';


const config = {
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
    domain: process.env.HOST ?? "localhost",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

const schemaRegisterUser = z.object({
    username: z.string().min(3).max(20, {
        message: 'Username must be between 3 and 20 characters',
    }),
    email: z.string().email({
        message: 'Invalid email address',
    }),
    password: z.string().min(6).max(25, {
        message: 'Password must be between 6 and 25 characters',
    }),
    });

export  async function registerUserAction(prevState: any, formData: FormData) {

 const validateFields = schemaRegisterUser.safeParse({
        username: formData.get('username') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    });
if (!validateFields.success) {
        return {
            ...prevState,
          zodErrors: validateFields.error.flatten().fieldErrors,
            message: 'Invalid form data',
        };
    }

    const responseData = await registerUserService(validateFields.data);

if (responseData.error) {
        return {
            ...prevState,
            strapiErrors: responseData.error,
            ZodErrors: null,
            message: responseData.message,
        };
    }

    cookies().set("jwt", responseData.jwt, config);
    redirect("/dashboard");
    console.log("responseData", responseData.jwt);
return {
    ...prevState,
    data: "User registered successfully",
}

 
    }