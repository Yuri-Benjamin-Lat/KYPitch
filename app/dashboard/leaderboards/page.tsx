import NavigationBar from "@/components/NavigationBar";
import Utilities from "@/components/Utilities";
import Footer from "@/components/Footer";
import PageTitle from "@/components/PageTitle";

export default function leaderboardsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full max-w-[1200px] mx-auto flex-1 flex flex-col bg-background">
        <NavigationBar />
        <Utilities />
        <PageTitle title="Leaderboards" backHref="/dashboard" />
      </div>
      <Footer />
    </div>
  );
}