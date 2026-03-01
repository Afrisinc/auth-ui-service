import { useMutation } from '@tanstack/react-query';
import {
  loginService,
  registrationService,
  signupService,
  verifyEmailService,
} from '@/services/auth';
import type { LoginSchemaType, RegisterSchemaType } from '@/lib/schemas/auth';
import type { SignupPayload } from '@/components/auth/signup/schemas';

export function useLogin() {
  return useMutation({
    mutationFn: (params: LoginSchemaType) => loginService(params),
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: (params: RegisterSchemaType) => registrationService(params),
  });
}

export function useSignup() {
  return useMutation({
    mutationFn: (payload: SignupPayload) => signupService(payload),
  });
}

export function useVerifyEmail() {
  return useMutation({
    mutationFn: (token: string) => verifyEmailService(token),
  });
}
