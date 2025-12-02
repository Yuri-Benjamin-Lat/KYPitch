import NavigationBar from "@/components/NavigationBar";
import Utilities from "@/components/Utilities";
import WelcomeMessage from "./dashboardComponents/welcomeMessage";
import Contents from "./dashboardComponents/contents";
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

/* 
Notes

1. Make changes to the <NavigationBar />
    - It does not have validation to change from main page to dashboard
        - they should look different because user has already logged in.
*/