import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { api } from "@utils/api";
import Layout from "@/components/layout";
import "@styles/globals.css";
import UserContext from "@/userContext/userContext";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <UserContext>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserContext>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
