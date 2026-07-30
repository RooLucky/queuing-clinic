import { redirect } from "next/navigation";
import { HeartPulse, ShieldCheck } from "lucide-react";

import { LoginForm } from "./login-form";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { hasAdminRole } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  if (data?.claims?.sub && hasAdminRole(data.claims)) {
    redirect("/admin");
  }

  return (
    <main className="relative flex min-h-svh items-center justify-center overflow-hidden bg-muted/40 px-4 py-10">
      <div className="absolute inset-x-0 top-0 h-64 bg-linear-to-b from-primary/10 to-transparent" />
      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border bg-background shadow-xl lg:grid-cols-[1.05fr_0.95fr]">
        <section className="hidden flex-col justify-between bg-primary p-10 text-primary-foreground lg:flex">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-xl bg-primary-foreground/15">
              <HeartPulse className="size-6" />
            </span>
            <div>
              <p className="font-semibold">Queue Clinic</p>
              <p className="text-sm text-primary-foreground/70">Patient flow, simplified.</p>
            </div>
          </div>

          <div className="space-y-5">
            <Badge className="bg-primary-foreground/15 text-primary-foreground">
              Staff workspace
            </Badge>
            <h1 className="max-w-md text-4xl leading-tight font-semibold tracking-tight">
              Keep every patient moving and every clinician informed.
            </h1>
            <p className="max-w-md text-base leading-7 text-primary-foreground/75">
              Monitor today&apos;s load, call the next patient, and keep the waiting room in sync.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-primary-foreground/70">
            <ShieldCheck className="size-4" />
            Secure access for authorized clinic staff
          </div>
        </section>

        <section className="flex items-center p-5 sm:p-10 lg:p-14">
          <Card className="w-full border-0 bg-transparent shadow-none ring-0">
            <CardHeader className="px-0 pb-3">
              <div className="mb-5 flex items-center gap-3 lg:hidden">
                <span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground">
                  <HeartPulse className="size-5" />
                </span>
                <span className="font-semibold">Queue Clinic</span>
              </div>
              <CardTitle className="text-2xl font-semibold">Welcome back</CardTitle>
              <CardDescription className="text-base">
                Sign in with your clinic staff account.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-0">
              <LoginForm />
              <p className="mt-6 text-center text-xs leading-5 text-muted-foreground">
                Need access? Contact your clinic administrator.
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
