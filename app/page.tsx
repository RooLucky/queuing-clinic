import Link from "next/link";
import {
  Accessibility,
  ArrowRight,
  CalendarCheck2,
  HeartPulse,
  Languages,
  ShieldCheck,
  UserRoundPlus,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const checkInOptions = [
  {
    title: "Walk-in patient",
    description: "I do not have an appointment today.",
    icon: UserRoundPlus,
    accent: "bg-primary/10 text-primary",
  },
  {
    title: "I have an appointment",
    description: "Check in using your booking details.",
    icon: CalendarCheck2,
    accent: "bg-sky-100 text-sky-700",
  },
] as const;

export default function KioskPage() {
  return (
    <main className="flex min-h-svh flex-col bg-muted/35">
      <header className="border-b bg-background">
        <div className="mx-auto flex h-20 w-full max-w-6xl items-center px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-xl bg-primary text-primary-foreground">
              <HeartPulse className="size-6" />
            </span>
            <div>
              <p className="text-lg font-semibold leading-tight">Queue Clinic</p>
              <p className="text-sm text-muted-foreground">Patient check-in</p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button aria-label="Accessibility options" size="icon" variant="outline">
              <Accessibility />
            </Button>
            <Button className="hidden gap-2 sm:flex" variant="outline">
              <Languages />
              English
            </Button>
          </div>
        </div>
      </header>

      <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 py-10 sm:px-8">
        <div className="mx-auto mb-9 max-w-2xl text-center">
          <Badge className="mb-4 border-primary/20 bg-primary/5 text-primary" variant="outline">
            Welcome to the clinic
          </Badge>
          <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
            How would you like to check in?
          </h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            Select an option below. It only takes a minute, and your place in line will update automatically.
          </p>
        </div>

        <div className="mx-auto grid w-full max-w-4xl gap-5 lg:grid-cols-2">
          {checkInOptions.map(({ accent, description, icon: Icon, title }) => (
            <Card className="min-h-72 justify-between p-2 transition hover:-translate-y-0.5 hover:shadow-lg" key={title}>
              <CardHeader className="gap-4 p-5">
                <span className={cn("grid size-14 place-items-center rounded-2xl", accent)}>
                  <Icon className="size-7" />
                </span>
                <div>
                  <CardTitle className="text-2xl">{title}</CardTitle>
                  <CardDescription className="mt-2 text-base leading-6">
                    {description}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="p-5 pt-0">
                <Button className="h-14 w-full justify-between px-5 text-base" type="button">
                  Start check-in
                  <ArrowRight data-icon="inline-end" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center justify-between gap-4 rounded-2xl border bg-background px-5 py-4 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-700">
              <ShieldCheck className="size-5" />
            </span>
            <div>
              <p className="font-medium">Your information stays private</p>
              <p className="text-sm text-muted-foreground">The waiting-room display only shows queue numbers.</p>
            </div>
          </div>
          <Link className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "shrink-0")} href="/login">
            Staff sign in
          </Link>
        </div>
      </section>

      <footer className="border-t bg-background py-4 text-center text-sm text-muted-foreground">
        Need help? Please ask our front-desk staff.
      </footer>
    </main>
  );
}
