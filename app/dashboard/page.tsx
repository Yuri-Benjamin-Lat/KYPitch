import HeroSection from "@/components/HeroSection";
import About from "@/components/About";
import Demo from "@/components/Demo"; 

import NavigationBar from "@/components/NavigationBar";
import Utilities from "@/components/Utilities";
import WelcomeMessage from "../dashboardComponents/WelcomeMessage";
import Contents from "../dashboardComponents/Contents";
import Footer from "@/components/Footer";

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full max-w-[1200px] mx-auto flex-1 flex flex-col bg-background">
        <NavigationBar />
        <Utilities />
        <WelcomeMessage />
        <Contents />
      </div>
      <Footer />
    </div>
  );
}
