"use client";

import { WordSelectionForm } from "@/components/forms/WordSelectionForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <WordSelectionForm />
    </main>
  );
}
