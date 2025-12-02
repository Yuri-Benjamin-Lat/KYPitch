"use client";

export default function SignUp({ onClose }: { onClose: () => void }) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            role="dialog"
            aria-modal="true"
        >
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/20"
                onClick={onClose}
            />

            {/* Modal */}
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative bg-[var(--background)] text-[var(--foreground)] rounded-xl shadow-lg w-full flex flex-col
                ml-6 mr-6 p-6 gap-4 max-w-md border-2
                md:max-h-md md:p-12 md:border-3
                lg:max-w-lg lg:max-h-lg lg:p-16 lg:border-4
                ">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-2xl hover:opacity-70"
                >
                    ✕
                </button>

                <h2 className="font-bold text-center
                text-2xl mb-2 mt-2
                md:text-3xl md:mb-6 
                lg:text-4xl lg:mb-8
                ">
                    Create an Account
                </h2>

                <div className="flex flex-col gap-1">
                    <label className="font-semibold">Gmail</label>
                    <input
                        type="email"
                        placeholder="yourname@gmail.com"
                        className="w-full rounded-md border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-[var(--accent)]
                        px-3 py-2
                        "/>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="font-semibold">Password</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full rounded-md border border-gray-300
                        bg-white text-black focus:outline-none focus:ring-2 focus:ring-[var(--accent)]
                        px-3 py-2
                        "/>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="font-semibold">Username</label>
                    <input
                        type="text"
                        placeholder="Choose a username"
                        className="w-full rounded-md border border-gray-300
                        bg-white text-black focus:outline-none focus:ring-2 focus:ring-[var(--accent)]
                        px-3 py-2 
                        "/>
                </div>

                <button
                    className="w-full mt-4 py-2 rounded-md bg-[var(--accent)] font-semibold text-background
                    bg-[var(--accent)] hover:bg-[var(--accent2)] transition
                    ">
                    Sign Up
                </button>
            </div>
        </div>
    );
}
