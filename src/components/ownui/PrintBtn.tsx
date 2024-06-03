"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { Printer } from "lucide-react";
import { RefObject, useCallback, useState } from "react";
import ReactToPrint from "react-to-print";
import { Loader2 } from "lucide-react";

interface PrintBtnProps {
  className?: ClassValue;
  ReceiptRef: RefObject<HTMLDivElement>;
}

export function PrintBtn({ className, ReceiptRef }: PrintBtnProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const reactToPrintContent = useCallback(() => {
    return ReceiptRef.current;
  }, [ReceiptRef]);

  function reactToPrintTrigger() {
    return (
      <Button
        size="icon"
        className={cn([className, "group w-16 h-16 rounded-full"])}
      >
        {loading ? (
          <Loader2 className="animate-spin"/>
        ) : (
          <Printer className="group-hover:scale-125 transition-transform" />
        )}
      </Button>
    );
  }

  const handleBeforePrint = useCallback(() => {
    setLoading(true);
  }, []);

  const handleAfterPrint = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <ReactToPrint
      content={reactToPrintContent}
      trigger={reactToPrintTrigger}
      documentTitle="Receipt"
      onBeforePrint={handleBeforePrint}
      onAfterPrint={handleAfterPrint}
    />
  );
}
