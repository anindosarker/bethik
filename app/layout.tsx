import { Nav } from "@/components/Nav";
import { ThemeProvider } from "@/context/theme-provider";
import "@/styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/bethik-ico.png" />
        <title>Bethik</title>
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Nav />

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
