import type { NextPage } from "next";
import Head from "next/head";
import TextSelection from "../components/Text/TextSelection";
import SentenceCount from "../components/Text/SentenceCount";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth, ThemeMinimal, ThemeSupa } from "@supabase/auth-ui-react";
import { ThemeVariables } from "@supabase/auth-ui-react/dist/esm/common/theming";

const Home: NextPage = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {!session ? (
        <Auth
          supabaseClient={supabase}
          providers={["google"]}
          appearance={{
            theme: ThemeMinimal,
            // variables: {
            //   default: {
            //     // fonts: {
            //     //   bodyFontFamily: `ui-sans-serif, sans-serif`,
            //     //   buttonFontFamily: `ui-sans-serif, sans-serif`,
            //     //   inputFontFamily: `ui-sans-serif, sans-serif`,
            //     //   labelFontFamily: `ui-sans-serif, sans-serif`,
            //     // },
            //   },
            // },
            // // className: {
            // //   // container: "flex flex-col justify-center items-center flex-1",
            // //   anchor: "text-white",
            // //   divider: "max-w-xs border-black justify-center items-center",
            // //   label: "",
            // //   button: "max-w-xs bg-black text-white",
            // //   input: "bg-white text-black",
            // //   loader: "bg-white text-black",
            // //   message: "bg-white text-black",
            // // },
          }}
          theme="dark"
        />
      ) : (
        <>
          <TextSelection />
          <SentenceCount />
        </>
      )}
    </div>
  );
};

export default Home;
