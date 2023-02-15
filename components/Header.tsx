import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import Sidebar from "./Dash/Sidebar";

export default function Header() {
  const supabase = useSupabaseClient();
  const session = useSession();

  const [navbar, setNavbar] = useState(false);

  return (
    <div className="sticky top-0 bg-white shadow-lg z-10">
      <Head>
        <title>Bethik</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {session && (
        <header aria-label="Site Header" className="shadow-sm">
          <div className="mx-auto max-w-screen-xl p-4">
            <div className="flex items-center justify-between gap-4 lg:gap-10">
              <div className="flex lg:w-0 lg:flex-1">
                <a href="#">
                  <span className="sr-only">Logo</span>
                  <span className="h-10 w-20 rounded-lg bg-gray-200"></span>
                </a>
              </div>

              <nav
                aria-label="Site Nav"
                className="hidden gap-8 text-sm font-medium md:flex"
              >
                <Link className="text-gray-500" href="/">
                  Home
                </Link>
                <Link className="text-gray-500" href="/dashboard">
                  Dashboard
                </Link>
              </nav>

              <div className="hidden flex-1 items-center justify-end gap-4 sm:flex">
                <button
                  className="flex items-center bg-red-50 rounded-full text-red-500 py-2 text-sm px-4"
                  onClick={() => {
                    supabase.auth.signOut();
                  }}
                >
                  Log out{" "}
                </button>
              </div>

              <div className="lg:hidden">
                <button
                  className="rounded-lg bg-gray-100 p-2 text-gray-600"
                  type="button"
                  onClick={() => {
                    setNavbar(!navbar);
                  }}
                >
                  {navbar ? (
                    <div>
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 18L18 6M6 6l12 12"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        />
                      </svg>
                      <Sidebar />
                    </div>
                  ) : (
                    <div>
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4 6h16M4 12h16M4 18h16"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        />
                      </svg>
                      <span className="sr-only">Open menu</span>
                                          </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </header>
      )}
    </div>
  );
}
