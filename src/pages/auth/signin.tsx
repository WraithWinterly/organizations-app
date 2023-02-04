import { getProviders, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";

export default function SignIn({ providers }: any) {
  const router = useRouter();

  const [signingIn, setSigningIn] = useState(false);

  return (
    <div className="relative flex min-h-screen flex-col">
      <section className="fixed-center text-center">
        <h1>Daily Planner</h1>
        <div className="mt-2 flex rounded-lg bg-gradient-to-r from-slate-800 to-slate-900 px-8 py-8">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            className="h-80"
          />
          <div className="mr-4 flex flex-col items-center">
            <h1 className="">Sign In to Continue</h1>
            {!!providers ? (
              Object.values(providers).map((provider: any) => (
                <button
                  key={provider.name}
                  className="btn btn-lg flex items-center justify-start gap-3"
                  onClick={() => {
                    setSigningIn(true);
                    signIn(provider.id, {
                      callbackUrl: router.query.callbackUrl as string,
                    });
                  }}
                >
                  {provider.name == "GitHub" && <FaGithub></FaGithub>}
                  <div className="pb-[2px]">Sign in with {provider.name}</div>
                </button>
              ))
            ) : (
              <h3>
                There are no sign-in providers. The Next Auth API Server is not
                working as expected.
              </h3>
            )}
          </div>
        </div>
      </section>
      {/* {signingIn && <LoadingScreen text="Signing In" />} */}
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
