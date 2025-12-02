"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Temporary Entry Button

import SignUp from "@/components/SignUp";
import SignIn from "@/components/SignIn";

export default function Footer() {
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);

  const router = useRouter(); // Temporary Entry Button

  async function goToDashboard() { // temporary Entry Button
    try {
      console.log("goToDashboard clicked");
      // await so we can catch runtime errors (and ensure navigation started)
      await router.push("/dashboard");
      console.log("router.push completed");
    } catch (err) {
      console.error("router.push failed:", err);
      // optionally show user-visible error, e.g. toast (not included here)
    }
  }

  return (
    <>
      <footer className="w-full bg-foreground text-background mt-auto">
        <div className="mx-auto flex flex-col items-center
        py-8 px-4
        md:py-12 md:px-8
      ">

          <p className="font-bold
          text-lg
          md:text-3xl 
          lg:text-3xl
        ">
            KYPitch
          </p>

          <div className="flex items-center
          gap-6 mt-6 
          md:gap-10 md:mt-8
          lg:gap-20 lg:mt-10
        ">

            <a href="#about" className="hover:opacity-70 transition
            text-sm
            md:text-base
            lg:text-xl
          ">
              About
            </a>

            <button
              onClick={() => setSignInOpen(true)}
              className="hover:opacity-70 transition cursor-pointer
            text-sm
            md:text-base
            lg:text-xl
          ">
              Sign In
            </button>

            <button
              onClick={() => setSignUpOpen(true)}
              className="hover:opacity-70 transition cursor-pointer
            text-sm
            md:text-base
            lg:text-xl
          ">
              Sign Up
            </button>

            <button
              type="button"
              onClick={goToDashboard}
              className="hover:opacity-70 transition cursor-pointer
              text-sm
              md:text-base
              lg:text-xl
              ">
                🛠 Temporary Entry 🛠
            </button>
          </div>

          <p className="
          text-xs mt-6
          md:text-base md:mt-8
          lg:text-xl lg:mt-10
        ">
            Web app by: Yuri L.
          </p>
          <p className="opacity-70
          text-xs mt-4
          md:text-base
          lg:text-xl
        ">
            © {new Date().getFullYear()} KYPitch. All rights reserved.
          </p>
        </div>
      </footer>

      {signUpOpen && <SignUp onClose={() => setSignUpOpen(false)} />}
      {signInOpen && <SignIn onClose={() => setSignInOpen(false)} />}
    </>
  );
}
