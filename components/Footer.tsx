"use client";
import { usePathname } from "next/navigation";
import { useAuth, SignInButton, SignUpButton } from "@clerk/nextjs";

export default function Footer() {
  const { isSignedIn } = useAuth();
  const pathname = usePathname();
  const isOnDashboard = pathname.startsWith("/dashboard");

  return (
    <footer className="w-full bg-foreground text-background mt-20">
      <div className="mx-auto flex flex-col items-center py-8 px-4 md:py-12 md:px-8">
        <p className="font-bold text-lg md:text-3xl lg:text-3xl">KYPitch</p>

        <div className="flex items-center gap-6 mt-6 md:gap-10 md:mt-8 lg:gap-20 lg:mt-10">
          {!isOnDashboard && (
            <a href="#about" className="hover:opacity-70 transition text-sm md:text-base lg:text-xl">About</a>
          )}

          {!isSignedIn && (
            <>
              <SignInButton mode="modal">
                <button className="hover:opacity-70 transition cursor-pointer text-sm md:text-base lg:text-xl">Sign In</button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="hover:opacity-70 transition cursor-pointer text-sm md:text-base lg:text-xl">Sign Up</button>
              </SignUpButton>
            </>
          )}
        </div>

        <p className="text-xs mt-6 md:text-base md:mt-8 lg:text-xl lg:mt-10">Web app by: Yuri L.</p>
        <p className="opacity-70 text-xs mt-4 md:text-base lg:text-xl">© {new Date().getFullYear()} KYPitch. All rights reserved.</p>
      </div>
    </footer>
  );
}