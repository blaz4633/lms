import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center">
      <Link href="/" className="absolute left-4 top-4">
        <Button variant="outline">
          <ArrowLeftIcon className="size-4" />
          Back
        </Button>
      </Link>
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          className="flex items-center gap-2 self-center font-medium"
          href="/"
        >
          <Image
            src="/logo.svg"
            alt="Learn Management System"
            width={32}
            height={32}
          />
          <span>Learning Management System</span>
        </Link>
        {children}

        <div className="text-balance text-center text-xs text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <span className="underline hover:text-primary cursor-pointer">
            Terms of Service
          </span>{" "}
          and{" "}
          <span className="underline hover:text-primary cursor-pointer">
            Privacy Policy
          </span>
          .
        </div>
      </div>
    </div>
  );
}
