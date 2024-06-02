import { cn } from "@/lib/utils";
import { dancing_script } from "@/lib/utils";

import Receipt from "@/components/Receipt";

export default function Page() {
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
        <Receipt />
      </div>
    </main>
  );
}
