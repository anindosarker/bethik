"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./ModeToggle";

export function Nav() {
  const pathname = usePathname();

  return (
    <nav
      className="
    border-b flex
    flex-col sm:flex-row
    items-start sm:items-center
    sm:pr-10
    sticky top-0
    z-50
    bg-inherit
    "
    >
      <div className="py-3 px-8 flex flex-1 items-center p">
        <Link
          href="/"
          className={`mr-5 text-sm ${pathname !== "/" && "opacity-50"}`}
        >
          <Image
            src="/bethik-logo.png"
            alt="logo"
            width={100}
            height={10}
            className="dark:bg-zinc-50 rounded-md p-2"
          />
        </Link>
        <Link
          href="/test"
          className={`mr-5 text-sm ${pathname !== "/test" && "opacity-60"}`}
        >
          <p>Test</p>
        </Link>
      </div>
      <div
        className="
        flex
        sm:items-center
        pl-8 pb-3 sm:p-0
      "
      >
        <Button variant="secondary" className="mr-4">
          Log in
          <ChevronRight className="h-4 w-4" />
        </Button>

        <ModeToggle />
      </div>
    </nav>
  );
}
