import Link from "next/link";
import { redirect } from "next/navigation";
import { HeartPulse, LayoutDashboard, LogOut, Monitor, UserRound } from "lucide-react";

import { logoutAction } from "./actions";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { hasAdminRole } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims?.sub || !hasAdminRole(data.claims)) {
    redirect("/login");
  }

  const email =
    typeof data.claims.email === "string" ? data.claims.email : "Clinic staff";

  return (
    <div className="min-h-svh bg-muted/35">
      <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
          <Link className="flex items-center gap-2.5" href="/admin">
            <span className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground">
              <HeartPulse className="size-5" />
            </span>
            <span className="hidden font-semibold sm:inline">Queue Clinic</span>
          </Link>

          <Separator className="mx-1 hidden h-6 sm:block" orientation="vertical" />

          <nav className="flex items-center gap-1">
            <Link
              className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "gap-2")}
              href="/admin"
            >
              <LayoutDashboard />
              Dashboard
            </Link>
            <Link
              className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "hidden gap-2 sm:flex")}
              href="/clinic-kiosk"
            >
              <Monitor />
              Kiosk
            </Link>
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <Badge className="hidden max-w-52 gap-1.5 sm:flex" variant="secondary">
              <UserRound />
              <span className="truncate">{email}</span>
            </Badge>
            <form action={logoutAction}>
              <Button aria-label="Sign out" size="icon" type="submit" variant="ghost">
                <LogOut />
              </Button>
            </form>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
