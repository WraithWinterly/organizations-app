import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Header() {
  const session = useSession();
  const router = useRouter();
  return (
    <div className="absolute top-0 right-0 bottom-0 left-0 h-16 w-full bg-purple-600 bg-opacity-20 text-white backdrop-blur-md">
      <div className="flex h-full w-full items-center justify-between px-8">
        {/* Left section */}
        <Link href="/">
          <button
            className={`btn ${
              router.pathname === "/" ? "btn-accent" : "btn-primary"
            }`}
          >
            Home
          </button>
        </Link>
        {/* Right section */}
        <div className="flex gap-4">
          <Link href="/organizations">
            <button
              className={`btn ${
                router.pathname === "/organizations"
                  ? "btn-accent"
                  : "btn-primary"
              }`}
            >
              View Organizations
            </button>
          </Link>
          <Link href="/dashboard">
            <button
              className={`btn ${
                router.pathname === "/dashboard" ? "btn-accent" : "btn-primary"
              }`}
            >
              Dashboard
            </button>
          </Link>
          {session.status === "unauthenticated" && (
            <button className="btn-primary btn" onClick={() => signIn()}>
              Sign In
            </button>
          )}
          {session.status === "authenticated" && (
            <Link href="/profile">
              <button
                className={`btn ${
                  router.pathname === "/profile" ? "btn-accent" : "btn-primary"
                }`}
              >
                My Profile
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
