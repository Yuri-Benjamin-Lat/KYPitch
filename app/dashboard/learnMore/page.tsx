import NavigationBar from "@/components/NavigationBar";
import Utilities from "@/components/Utilities";
import Footer from "@/components/Footer";

export default function learnMorePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full max-w-[1200px] mx-auto flex-1 flex flex-col bg-background">
        <NavigationBar />
        <Utilities />
        <p className="text-center text-5xl font-bold mt-20">Learn More Page</p>
      </div>
      <Footer />
    </div>
  );
}