"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { GithubIcon, LoaderIcon, MailIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

export const LoginForm = () => {
  const router = useRouter();
  const [githubPending, startGithubTransition] = useTransition();
  const [emailPending, startEmailTransition] = useTransition();
  const [email, setEmail] = useState("");

  const signInWithGithub = async () => {
    startGithubTransition(async () => {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed in successfully with Github, redirecting...");
          },
          onError: () => {
            toast.error("Failed to sign in with Github");
          },
        },
      });
    });
  };

  const signInWithEmail = async () => {
    startEmailTransition(async () => {
      await authClient.emailOtp.sendVerificationOtp({
        email,
        type: "sign-in",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Verification OTP sent to email, redirecting...");
            router.push(`/verify-request?email=${email}`);
          },
          onError: () => {
            toast.error("Failed to send verification OTP");
          },
        },
      });
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Welcome back!</CardTitle>
        <CardDescription>Login with your Github email account</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Button
          onClick={signInWithGithub}
          disabled={githubPending}
          className="w-full"
          variant="outline"
        >
          {githubPending ? (
            <>
              <LoaderIcon className="size-4 animate-spin" />
              <span>Signing in with Github...</span>
            </>
          ) : (
            <>
              <GithubIcon className="size-4" />
              <span>Sign in with GitHub</span>
            </>
          )}
        </Button>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-card px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>

        <div className="grid gap-3">
          <div className="grid gap-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
          </div>

          <Button onClick={signInWithEmail} disabled={emailPending}>
            {emailPending ? (
              <>
                <LoaderIcon className="size-4 animate-spin" />
                <span>Sending verification OTP...</span>
              </>
            ) : (
              <>
                <MailIcon className="size-4" />
                <span>Continue with email</span>
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
