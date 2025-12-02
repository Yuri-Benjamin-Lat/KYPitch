"use client";

export default function WelcomeMessage() {
    return (
        <p className="text-center font-normal 
        text-base py-4
        md:text-2xl md:py-8
        lg:text-3xl lg:py-8
        ">
            Hello, <span className="font-bold">User</span>!
        </p>
    );
}

/* Make "User" display their own names */