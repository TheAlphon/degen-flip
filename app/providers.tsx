"use client";

import { ReactNode } from "react";
import { base } from "wagmi/chains";
import { OnchainKitProvider } from "@coinbase/onchainkit";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <OnchainKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY ?? ""}
      chain={base}
      config={{
        appearance: {
          mode: "auto",
          theme: "mini-app-theme",
        },
        wallet: {
          display: "modal",
        },
      }}
    >
      {children}
    </OnchainKitProvider>
  );
}
