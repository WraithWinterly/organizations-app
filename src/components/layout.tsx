import { ReactNode } from "react";
import Header from "./header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="relative">
        <main className="lg:prose-xl prose relative flex h-full min-h-screen min-w-full flex-col items-center bg-gradient-to-br from-gray-800 to-purple-900 pt-20 text-white">
          {children}
        </main>
        <Header />
      </div>
    </>
  );
}
