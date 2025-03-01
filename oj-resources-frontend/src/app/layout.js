import { Metadata } from "next";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "OJ Resources",
  description: "Online Judge Resources Platform",
};

/**
 * Root layout component that wraps the entire application.
 * Provides authentication UI elements and common styling.
 *
 * @param {Object} props - Component props
 * @param {import('react').ReactNode} props.children - Child components to be rendered within the layout
 * @returns {JSX.Element} The root layout structure with authentication components and children
 */
{
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <header className="flex justify-end items-center p-4 gap-4 h-16">
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
