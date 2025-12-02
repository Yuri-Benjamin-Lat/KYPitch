"use client";

export default function WelcomeMessage() {
    return (
        <p className="text-center font-normal 
        text-xl py-4
        md:text-3xl md:py-8
        lg:text-4xl lg:py-8
        ">
            Hello, <span className="font-bold">User</span>!
        </p>
    );
}

/* Make "User" display their own names */