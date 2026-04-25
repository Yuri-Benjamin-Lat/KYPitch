import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import HeroSection from "@/components/HeroSection";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import About from "@/components/About";
import Demo from "@/components/Demo";

export default async function Home() {
    const { userId } = await auth();
    if (userId) redirect("/dashboard");

    return (
        <div className="min-h-screen flex flex-col">
            <div className="w-full max-w-[1200px] mx-auto flex-1 flex flex-col bg-background">
                <NavigationBar />
                <HeroSection />
                <Demo />
                <About />
            </div>
            <Footer />
        </div>
    );
}