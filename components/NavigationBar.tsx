"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import LightDarkMode from "./utilitiesComponents/LightDarkMode";

export default function NavigationBar() {
  const { isSignedIn } = useAuth();
  const pathname = usePathname();
  const isOnDashboard = pathname.startsWith("/dashboard");

  return (
    <nav className="w-full flex justify-between items-center mx-auto py-4 px-4 md:py-6 md:px-8 lg:py-8 lg:px-8">
      <Link href="/" className="font-bold text-lg md:text-3xl lg:text-3xl">KYPitch</Link>

      <div className="flex items-center gap-4 md:gap-6 lg:gap-8">
        <LightDarkMode />

        {!isOnDashboard && (
          <a href="#about" className="font-light hover:opacity-70 text-sm md:text-xl lg:text-xl">About</a>
        )}

        {!isSignedIn && (
          <>
            <SignInButton mode="modal">
              <button className="font-light hover:opacity-70 transition cursor-pointer text-sm md:text-xl lg:text-xl">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="text-background font-semibold bg-[var(--accent)] hover:bg-[var(--accent2)] cursor-pointer text-sm px-3 py-1 rounded-md md:text-xl md:px-5 md:py-2 md:rounded-lg">
                Sign Up
              </button>
            </SignUpButton>
          </>
        )}

        {isSignedIn && (
          <>
            <UserButton />
          </>
        )}
      </div>
    </nav>
  );
}