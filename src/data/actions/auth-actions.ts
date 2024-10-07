"use server";
import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  registerUserService,
  loginUserService,
} from "@/data/services/auth-service";

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  domain:
  process.env.NODE_ENV === "production"
    ? "gregory-medical-journal.vercel.app"
    : "localhost",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",

};

const schemaRegister = z.object({
  username: z.string().min(3).max(20, {
    message: "Username must be between 3 and 20 characters",
  }),
  password: z.string().min(6).max(100, {
    message: "Password must be between 6 and 100 characters",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

export async function registerUserAction(prevState: any, formData: FormData) {
  const validatedFields = schemaRegister.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      strapiErrors: null,
      message: "Missing Fields. Failed to Register.",
    };
  }

  const responseData = await registerUserService(validatedFields.data);

  if (!responseData) {
    return {
      ...prevState,
      strapiErrors: null,
      zodErrors: null,
      message: "Ops! Something went wrong. Please try again.",
    };
  }

  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: "Failed to Register.",
    };
  }

  cookies().set("jwt", responseData.jwt, config);
  redirect("/dashboard");
}

const schemaLogin = z.object({
    identifier: z
      .string()
      .min(3, {
        message: "Identifier must have at least 3 or more characters",
      })
      .max(100)
      .refine((value) => {
        return (
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || // Checks if it's a valid email
          /^[a-zA-Z0-9_]+$/.test(value)              // Checks if it's a valid username
        );
      }, {
        message: "Please enter a valid username or email address",
      }),
    password: z
      .string()
      .min(6, {
        message: "Password must have at least 6 or more characters",
      })
      .max(100, {
        message: "Password must be between 6 and 100 characters",
      }),
  });
  
export async function loginUserAction(prevState: any, formData: FormData) {
    const validatedFields = schemaLogin.safeParse({
      identifier: formData.get("identifier"),
      password: formData.get("password"),
    });
  
    if (!validatedFields.success) {
   
      return {
        ...prevState,
        zodErrors: validatedFields.error.flatten().fieldErrors,
        message: "Missing Fields. Failed to Login.",
      };
    }
  
    const responseData = await loginUserService(validatedFields.data);
  
    if (!responseData) {

      return {
        ...prevState,
        strapiErrors: responseData.error,
        zodErrors: null,
        message: "Ops! Something went wrong. Please try again.",
      };
    }
  
    if (responseData.error) {

      return {
        ...prevState,
        strapiErrors: responseData.error,
        zodErrors: null,
        message: "Failed to Login.",
      };
    }
  
    cookies().set("jwt", responseData.jwt, config);
  
    console.log("Redirecting to dashboard...");
    redirect("/dashboard");
  }
  

export async function logoutAction() {
  cookies().set("jwt", "", { ...config, maxAge: 0 });
  redirect("/");
}

///Reset Password Logic

import { sendResetPasswordEmailService, resetPasswordService } from "@/data/services/auth-service";

const schemaResetRequest = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

export async function sendResetPasswordEmailAction(prevState: any, formData: FormData) {
  const validatedFields = schemaResetRequest.safeParse({
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      strapiErrors: null,
      message: "Invalid email address",
    };
  }

  const responseData = await sendResetPasswordEmailService(validatedFields.data.email);

  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: "Failed to send reset email.",
    };
  }

  return {
    ...prevState,
    zodErrors: null,
    strapiErrors: null,
    message: "Reset email sent successfully.",
  };
}

const schemaResetPassword = z.object({
  password: z.string().min(6).max(100, {
    message: "Password must be between 6 and 100 characters",
  }),
  confirmPassword: z.string().min(6).max(100, {
    message: "Password must be between 6 and 100 characters",
  }),
  token: z.string().min(1, {
    message: "Invalid token",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export async function resetPasswordAction(prevState: any, formData: FormData) {
  const validatedFields = schemaResetPassword.safeParse({
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    token: formData.get("token"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      strapiErrors: null,
      message: "Invalid fields. Failed to reset password.",
    };
  }

  const responseData = await resetPasswordService(validatedFields.data);

  if (responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: "Failed to reset password.",
    };
  }

  return {
    ...prevState,
    zodErrors: null,
    strapiErrors: null,
    message: "Password reset successfully.",
  };
}