import type { NextPage } from "next";
import TextSelection from "../components/Text/TextSelection";
import SentenceCount from "../components/Text/SentenceCount";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";

const Home: NextPage = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <div className="flex flex-col justify-center items-center my-40 sm:max-w-3xl sm:mx-auto">
      {!session ? (
        <Auth
          supabaseClient={supabase}
          providers={["google"]}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                fonts: {
                  labelFontFamily: "Roboto",
                  inputFontFamily: "Roboto",
                  buttonFontFamily: "Roboto",
                  bodyFontFamily: "Roboto",
                },
              },
            },
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
