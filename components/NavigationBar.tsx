"use client";

import SignUp from "@/components/SignUp";
import SignIn from "@/components/SignIn";

import { useState } from "react";
import Link from "next/link";

export default function NavigationBar() {

  const [SignUpOpen, setSignUpOpen] = useState(false);
  const [SignInOpen, setSignInOpen] = useState(false);

  return (
    <>
      <nav className="w-full flex justify-between items-center mx-auto
        py-4 px-4
        md:py-6 md:px-8
        lg:py-8 lg:px-8"
      >

        <Link
          href="/"
          className="font-bold
            text-lg
            md:text-3xl 
            lg:text-3xl"
        >
          KYPitch
        </Link>

        <div className="flex items-center 
          gap-6
          md:gap-8
          lg:gap-12"
        >

          <a
            href="#about"
            className="font-light hover:opacity-70 !transition-none
              text-sm 
              md:text-xl
              lg:text-xl"
          >
            About
          </a>

          <button
            onClick={() => setSignInOpen(true)}
            className="font-light hover:opacity-70 transition cursor-pointer
              text-sm
              md:text-xl
              lg:text-xl"
          >
            Sign In
          </button>

          <button
            onClick={() => setSignUpOpen(true)}
            className="text-background font-semibold bg-[var(--accent)] hover:bg-[var(--accent2)] cursor-pointer
              text-sm px-3 py-1 rounded-md
              md:text-xl md:px-5 md:py-2 md:rounded-lg"
          >
            Sign Up
          </button>

        </div>
      </nav>

      {SignUpOpen && <SignUp onClose={() => setSignUpOpen(false)} />}
      {SignInOpen && <SignIn onClose={() => setSignInOpen(false)} />}
    </>
  );
}
