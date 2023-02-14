import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import Header from "../components/Header";

function MyApp({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Toaster />
      <div className="flex flex-col h-screen overflow-y-hidden">
        <Header />
        <Component {...pageProps} />
      </div>
    </SessionContextProvider>
  );
}

export default MyApp;
