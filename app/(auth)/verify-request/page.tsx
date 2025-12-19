"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { LoaderIcon } from "lucide-react";

const VerifyRequestPage = () => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [emailPending, startEmailTransition] = useTransition();
  const params = useSearchParams();
  const email = params.get("email") as string;
  const isOtpComplete = otp.length === 6;

  const verifyOtp = async () => {
    startEmailTransition(async () => {
      await authClient.signIn.emailOtp({
        email,
        otp,
        fetchOptions: {
          onSuccess: () => {
            toast.success("Email verified successfully, redirecting...");
            router.push("/");
          },
          onError: () => {
            toast.error("Failed to verify email");
          },
        },
      });
    });
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Verify your email</CardTitle>
        <CardDescription>
          We've sent a verification code to your email. Please enter it below to
          verify your email.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center justify-center space-y-3">
          <InputOTP
            value={otp}
            onChange={(value) => setOtp(value)}
            maxLength={6}
            className="gap-2"
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <p className="text-sm text-muted-foreground">
            Enter the 6-digit code sent to your email
          </p>
        </div>

        <Button className="w-full" onClick={verifyOtp} disabled={emailPending}>
          {emailPending ? (
            <>
              <LoaderIcon className="size-4 animate-spin" />
              <span>Verifying account...</span>
            </>
          ) : (
            <>
              <span>Verify Account</span>
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default VerifyRequestPage;
