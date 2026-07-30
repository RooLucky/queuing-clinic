"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { hasAdminRole } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export type LoginState = {
  error?: string;
};

export async function loginAction(
  _previousState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    return { error: "Enter your email address and password." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: "The email or password is incorrect." };
  }

  if (!hasAdminRole(data.user)) {
    await supabase.auth.signOut();
    return { error: "This account does not have administrator access." };
  }

  revalidatePath("/", "layout");
  redirect("/admin");
}
