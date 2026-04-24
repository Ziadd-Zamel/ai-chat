import { NuqsAdapter } from "nuqs/adapters/react";
import ReactQueryProvider from "./components/react-query.provider";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { NextIntlClientProvider } from "next-intl";
import SessionProvider from "./components/session-provider";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      forcedTheme="dark"
      scriptProps={{ async: true }}
      value={{
        light: "light",
        dark: "dark",
      }}
    >
      <NuqsAdapter>
        <Toaster />
        <NextIntlClientProvider>
          <SessionProvider>
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </SessionProvider>
        </NextIntlClientProvider>
      </NuqsAdapter>
    </ThemeProvider>
  );
}
