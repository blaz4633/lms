"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

const Home = () => {
  const { data: session } = authClient.useSession();

  return (
    <div>
      <h1 className="text-3xl font-bold text-red-500">Hello World</h1>

      <ThemeToggle />

      {session ? (
        <div>
          <p>{session.user.email}</p>
          <Button onClick={() => authClient.signOut()}>Logout</Button>
        </div>
      ) : (
        <Link href="/login" className="text-blue-500">Login</Link>
      )}
    </div>
  );
};

export default Home;
