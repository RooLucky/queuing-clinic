"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { AlertCircle, ArrowRight, LockKeyhole, Mail } from "lucide-react";

import { loginAction, type LoginState } from "./actions";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: LoginState = {};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="h-11 w-full text-sm" disabled={pending} type="submit">
      {pending ? "Signing in…" : "Sign in to dashboard"}
      {!pending && <ArrowRight data-icon="inline-end" />}
    </Button>
  );
}

export function LoginForm() {
  const [state, formAction] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="space-y-5">
      {state.error && (
        <Alert variant="destructive">
          <AlertCircle />
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email address</Label>
        <div className="relative">
          <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            autoComplete="email"
            className="h-11 pl-9"
            id="email"
            name="email"
            placeholder="you@clinic.com"
            required
            type="email"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <LockKeyhole className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            autoComplete="current-password"
            className="h-11 pl-9"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
            type="password"
          />
        </div>
      </div>

      <SubmitButton />
    </form>
  );
}
