import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "@utils/api";
import Head from "next/head";
import Link from "next/link";
import abstract from "@assets/abstract.svg";

export default function Home() {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Organizations App</title>
        <meta
          name="description"
          content="Create your central community in one place!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className="absolute right-0 -top-10 h-[530px] w-[530px] bg-contain bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${abstract.src})`,
        }}
      ></div>
      <div className="container relative flex h-full flex-col justify-center px-4 py-16">
        <div className="flex max-w-xl flex-col justify-start gap-6">
          <div className="flex flex-col gap-1">
            <h1>Account management has never been easier.</h1>
            <p>
              Manage your campaigns, announcements, posts, <i>all in one </i>
              platform. Automate the marketing pain to enable your
              entrepreneurship.
            </p>
          </div>

          <div className="flex gap-2">
            <Link href="/organizations">
              <button className="btn">Get Started</button>
            </Link>
            <Link href="/about">
              <button className="btn">Learn how we work</button>
            </Link>
          </div>
        </div>

        {/* <div className="flex flex-col items-center gap-2">
          <p className="text-2xl text-white">
            {hello.data ? hello.data.greeting : "Loading tRPC query..."}
          </p>
          <AuthShowcase />
        </div> */}
      </div>
    </>
  );
}

// const AuthShowcase: React.FC = () => {
//   const { data: sessionData } = useSession();

//   const { data: secretMessage } = api.example.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: sessionData?.user !== undefined }
//   );

//   return (
//     <div className="flex flex-col items-center justify-center gap-4">
//       <p className="text-center text-2xl text-white">
//         {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
//         {secretMessage && <span> - {secretMessage}</span>}
//       </p>
//       <button
//         className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
//         onClick={sessionData ? () => void signOut() : () => void signIn()}
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </button>
//     </div>
//   );
// };
