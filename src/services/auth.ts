import { LoginSchemaType, RegisterSchemaType } from "@/lib/schemas/auth";
import type { SignupPayload } from "@/components/auth/signup/schemas";
import apiClient from "./apiClient";

export const loginService = async (params: LoginSchemaType) => {
    const { data } = await apiClient().post('/auth/login', {
        email: params.email,
        password: params.password,
        ...(params.product_code && { product_code: params.product_code })
    });

    return data;
}

export const registrationService = async (params: RegisterSchemaType) => {
    const { data } = await apiClient().post('/auth/register', {
        email: params.email,
        password: params.password,
        firstName: params.firstName,
        lastName: params.lastName,
        phone: params.phone,
        location: params.location
    });

    return data;
}

export const signupService = async (payload: SignupPayload) => {
    const { data } = await apiClient().post('/auth/register', payload);
    return data;
}

export const verifyEmailService = async (token: string) => {
    // Email verification is a public endpoint, doesn't require auth
    // Use a fresh client instance without Bearer token
    const client = apiClient();
    const { data } = await client.get(`/auth/verify-email?token=${encodeURIComponent(token)}`);
    return data;
}