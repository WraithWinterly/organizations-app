import { ReactNode } from "react";
import Header from "./header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="relative">
        <main className="relative flex h-full min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-purple-900 text-white">
          {children}
        </main>
        <Header />
      </div>
    </>
  );
}
