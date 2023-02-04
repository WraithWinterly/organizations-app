import { useSession } from "next-auth/react";
import NotSignedIn from "@/components/notSignedIn";

export default function Home() {
  const session = useSession();

  if (session.status === "unauthenticated") {
    return <NotSignedIn />;
  }

  return <div>Home Page</div>;
}
