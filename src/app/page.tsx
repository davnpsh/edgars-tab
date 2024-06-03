"use client";

import { cn } from "@/lib/utils";
import { dancing_script } from "@/lib/utils";

import Receipt from "@/components/Receipt";
import { PrintBtn } from "@/components/ownui/PrintBtn";
import { useRef, useState } from "react";

export default function Page() {
  const ReceiptRef = useRef<HTMLDivElement>(null);
  const [printing, setPrinting] = useState<boolean>(false);

  // Global printing state
  function togglePrinting() {
    setPrinting((prevPrinting) => !prevPrinting);
  }

  return (
    <main>
      <div className="mx-auto max-w-screen-xl flex flex-col items-center">
        <h1
          className={cn([
            dancing_script.className,
            "text-6xl select-none py-5",
          ])}
        >
          Edgar&apos;s tab
        </h1>
        <div ref={ReceiptRef}>
          <Receipt printing={printing} />
        </div>
      </div>
      <PrintBtn
        className="fixed bottom-10 right-10"
        ReceiptRef={ReceiptRef}
        togglePrinting={togglePrinting}
      />
    </main>
  );
}
