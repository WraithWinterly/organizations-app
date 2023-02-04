import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Header() {
  const session = useSession();
  const router = useRouter();
  return (
    <div className="absolute top-0 right-0 bottom-0 left-0 h-16 w-full bg-purple-300 bg-opacity-20 text-white backdrop-blur-md">
      <div className="flex h-full w-full items-center justify-between px-8">
        <Link href="/">
          <button>Organizations App</button>
        </Link>
        {session.status === "unauthenticated" && (
          <button onClick={() => signIn()}>Sign In</button>
        )}
        {session.status === "authenticated" &&
          router.pathname !== "/profile" && (
            <Link href="/profile">
              <button>My Profile</button>
            </Link>
          )}
      </div>
    </div>
  );
}
