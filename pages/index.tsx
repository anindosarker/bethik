import type { NextPage } from "next";
import Head from "next/head";
import TextSelection from "../components/Text/TextSelection";
import CSVReader from "../components/Util/CSVReader";
import SentenceCount from "../components/Text/SentenceCount";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";

const Home: NextPage = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <div className="container flex mt-40 justify-center">
      {!session ? (
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={["google", "facebook", "twitter"]}
        />
      ) : (
        <div>
          <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <TextSelection />
          <SentenceCount />
        </div>
      )}
    </div>
  );
};

export default Home;
