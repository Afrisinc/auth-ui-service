import apiClient from "./apiClient";
import type { UserAccount, AccountProductEnrollment } from "@/types/platform";

export interface MyAccountsResponse {
  accounts: UserAccount[];
}

export interface CreateAccountPayload {
  type: "INDIVIDUAL" | "ORGANIZATION";
}

export interface CreateAccountResponse {
  id: string;
  type: "INDIVIDUAL" | "ORGANIZATION";
  owner_user_id: string;
  organization_id: string | null;
  createdAt: string;
}

export async function fetchMyAccounts(userId: string): Promise<MyAccountsResponse> {
  const { data } = await apiClient().get(`/accounts/user/${userId}`);

  if (!data.success || !data.data?.accounts) {
    throw new Error("Failed to fetch accounts");
  }

  return {
    accounts: data.data.accounts.map((account: Record<string, unknown>) => ({
      id: account.id as string,
      type: account.type as "INDIVIDUAL" | "ORGANIZATION",
      owner_user_id: account.owner_user_id as string,
      organization_id: account.organization_id as string | null,
      products: (account.products as AccountProductEnrollment[]) || [],
    })),
  };
}

export async function createAccount(
  payload: CreateAccountPayload
): Promise<CreateAccountResponse> {
  const { data } = await apiClient().post("/accounts", payload);

  if (!data.success || !data.data) {
    throw new Error(data.resp_msg || "Failed to create account");
  }

  return {
    id: String(data.data.id || ""),
    type: data.data.type as "INDIVIDUAL" | "ORGANIZATION",
    owner_user_id: String(data.data.owner_user_id || ""),
    organization_id: data.data.organization_id ? String(data.data.organization_id) : null,
    createdAt: String(data.data.createdAt || ""),
  };
}

export async function switchProduct(
  accountId: string,
  productCode: string
): Promise<{ redirect_url?: string }> {
  const { data } = await apiClient().post("/auth/switch-product", {
    account_id: accountId,
    product_code: productCode,
  });

  if (!data.success) {
    throw new Error(data.resp_msg || "Product switch failed");
  }

  return { redirect_url: data.data?.redirect_url };
}
