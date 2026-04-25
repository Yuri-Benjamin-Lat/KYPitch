import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import PageTitle from "@/components/PageTitle";
import LearnPagesComponent from "./learnMoreComponents/LearnPagesComponent";

export default function learnMorePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full max-w-[1200px] mx-auto flex-1 flex flex-col bg-background">
        <NavigationBar />
        <PageTitle title="Learn More" backHref="/dashboard" />
        <LearnPagesComponent />
      </div>
      <Footer />
    </div>
  );
}