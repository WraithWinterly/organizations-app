import { signIn } from "next-auth/react";

export default function NotSignedIn() {
  return (
    <div className="flex flex-col justify-center gap-2 text-center">
      <h1>You are not signed in.</h1>
      <p>You need to sign in to access this page.</p>
      <button className="btn-primary btn" onClick={() => signIn()}>
        Sign in
      </button>
    </div>
  );
}
