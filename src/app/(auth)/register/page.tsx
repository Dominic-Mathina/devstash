import Link from "next/link";
import { LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registerAction } from "./actions";

const ERROR_MESSAGES: Record<string, string> = {
  missing: "All fields are required.",
  mismatch: "Passwords do not match.",
  short: "Password must be at least 8 characters.",
  exists: "An account with this email already exists.",
};

interface Props {
  searchParams: Promise<{ error?: string }>;
}

export default async function RegisterPage({ searchParams }: Props) {
  const { error } = await searchParams;

  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
          <LayoutGrid className="h-5 w-5 text-primary-foreground" />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
        <p className="text-sm text-muted-foreground">Enter your details to get started</p>
      </div>

      <form action={registerAction} className="space-y-4">
        {error && (
          <p className="text-sm text-destructive text-center">
            {ERROR_MESSAGES[error] ?? "Registration failed. Please try again."}
          </p>
        )}
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="name">
            Name
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Your name"
            required
            autoComplete="name"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="email">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            autoComplete="email"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="password">
            Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            required
            autoComplete="new-password"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="confirm">
            Confirm password
          </label>
          <Input
            id="confirm"
            name="confirm"
            type="password"
            placeholder="••••••••"
            required
            autoComplete="new-password"
          />
        </div>
        <Button type="submit" className="w-full">
          Create account
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/sign-in" className="underline underline-offset-4 hover:text-foreground">
          Sign in
        </Link>
      </p>
    </div>
  );
}
