import HeroSection from "@/components/HeroSection";
import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import About from "@/components/About";
import Demo from "@/components/Demo"; 
import Utilities from "@/components/Utilities";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full max-w-[1200px] mx-auto flex-1 flex flex-col bg-background">
        <NavigationBar />
        <Utilities />
        <HeroSection />
        <Demo />
        <About />
      </div>
      <Footer />
    </div>
  );
}
