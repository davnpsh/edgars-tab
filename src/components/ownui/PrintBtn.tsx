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
  togglePrinting: () => void;
}

export function PrintBtn({
  className,
  ReceiptRef,
  togglePrinting,
}: PrintBtnProps) {
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
          <Loader2 className="animate-spin" />
        ) : (
          <Printer className="group-hover:scale-125 transition-transform" />
        )}
      </Button>
    );
  }

  const handleBeforeGetContent = useCallback(() => {
    return new Promise<void>((resolve) => {
      setLoading(true);
      togglePrinting();

      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }, []);

  const handleAfterPrint = useCallback(() => {
    setLoading(false);
    togglePrinting();
  }, []);

  return (
    <ReactToPrint
      content={reactToPrintContent}
      trigger={reactToPrintTrigger}
      documentTitle="Receipt"
      onBeforeGetContent={handleBeforeGetContent}
      onAfterPrint={handleAfterPrint}
      removeAfterPrint
    />
  );
}
