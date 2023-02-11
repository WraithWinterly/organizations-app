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
        <span>No Image</span>
      )}
      <div className="flex flex-col text-start">
        <span>Unique Id: {user?.id}</span>
        <span>Name: {user?.name}</span>
        <span>Email: {user?.email}</span>
      </div>

      <button
        onClick={() => {
          signOut();
        }}
        className="btn-warning btn"
      >
        Sign Out
      </button>
    </div>
  );
}
