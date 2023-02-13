import { useEffect } from "react";
import { useUserContext } from "@/userContext/userContext";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import Header from "./header";

export default function Layout({ children }: { children: ReactNode }) {
  const ctx = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (!router.pathname.includes("organizations/view")) {
      ctx.setBackgroundImage(null);
    }
  }, [router.pathname]);

  return (
    <>
      <main
        className={`lg:prose-xl prose relative flex h-full min-h-screen min-w-full flex-col items-center pt-20 text-white ${
          ctx.backgroundImage
            ? `bg-cover`
            : `bg-gradient-to-br from-gray-800 to-purple-900`
        }`}
        style={{
          backgroundImage: ctx.backgroundImage
            ? `url(${ctx.backgroundImage})`
            : "",
        }}
      >
        {children}
      </main>
      <Header />
    </>
  );
}
