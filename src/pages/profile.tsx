import { signOut, useSession } from "next-auth/react";
import NotSignedIn from "@/components/notSignedIn";

export default function Profile() {
  const session = useSession();
  const user = session.data?.user;
  if (session.status === "unauthenticated") {
    return <NotSignedIn />;
  }
  return (
    <div className="flex flex-col items-center gap-3">
      <h1>My Profile</h1>
      {!!user?.image ? (
        <img className="h-40 w-40 rounded-full" src={user.image}></img>
      ) : (
        <p>No Image</p>
      )}
      <div className="flex flex-col text-start">
        <p>Unique Id: {user?.id}</p>
        <p>Name: {user?.name}</p>
        <p>Email: {user?.email}</p>
      </div>

      <button
        onClick={() => {
          signOut();
        }}
      >
        Sign Out
      </button>
    </div>
  );
}
