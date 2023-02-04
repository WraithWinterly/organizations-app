import { signIn } from "next-auth/react";

export default function NotSignedIn() {
  return (
    <div>
      <div>You are not signed in.</div>
      <p>You need to sign in to access this page.</p>
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  );
}
