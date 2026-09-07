import type { Metadata } from "next";

import "./globals.css";

import Provider from "@/Provider";
import StoreProvider from "@/redux/StoreProvider";
import CurrentUser from "@/CurrentUser";
import AIChat from "@/components/user/AIChat";

export const metadata: Metadata = {
  title: "MultiCart",
  description: "Grocery Website",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <Provider>
          {/* SessionProvider shares the authentication session with all client components */}
          <StoreProvider>
            {/* Get current logged-in user */}
            <CurrentUser />

            {children}

            {/* Global MultiCart AI assistant */}
            <AIChat />
          </StoreProvider>
        </Provider>
      </body>
    </html>
  );
}
