import "dotenv/config";

import { createClient, type User } from "@supabase/supabase-js";

function requireEnvironmentVariable(name: string) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`${name} is required to seed the admin account`);
  }

  return value;
}

function createAdminClient(url: string, serviceRoleKey: string) {
  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

async function findUserByEmail(
  supabase: ReturnType<typeof createAdminClient>,
  email: string
): Promise<User | undefined> {
  const perPage = 1000;

  for (let page = 1; ; page += 1) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage });

    if (error) {
      throw error;
    }

    const user = data.users.find(
      ({ email: candidate }) => candidate?.toLowerCase() === email.toLowerCase()
    );

    if (user || data.users.length < perPage) {
      return user;
    }
  }
}

async function main() {
  const url = requireEnvironmentVariable("SUPABASE_URL");
  const serviceRoleKey = requireEnvironmentVariable("SUPABASE_SERVICE_ROLE_KEY");
  const email = requireEnvironmentVariable("ADMIN_EMAIL").toLowerCase();
  const password = requireEnvironmentVariable("ADMIN_PASSWORD");

  if (password.length < 8) {
    throw new Error("ADMIN_PASSWORD must contain at least 8 characters");
  }

  const supabase = createAdminClient(url, serviceRoleKey);

  const existingUser = await findUserByEmail(supabase, email);

  if (existingUser) {
    const { error } = await supabase.auth.admin.updateUserById(existingUser.id, {
      app_metadata: { ...existingUser.app_metadata, role: "admin" },
      email_confirm: true,
      password,
    });

    if (error) {
      throw error;
    }

    console.log(`Updated admin account: ${email}`);
    return;
  }

  const { error } = await supabase.auth.admin.createUser({
    app_metadata: { role: "admin" },
    email,
    email_confirm: true,
    password,
  });

  if (error) {
    throw error;
  }

  console.log(`Created admin account: ${email}`);
}

main().catch((error: unknown) => {
  console.error("Failed to seed admin account:", error);
  process.exitCode = 1;
});
