import NavigationBar from "@/components/NavigationBar";
import Footer from "@/components/Footer";
import PageTitle from "@/components/PageTitle";
import EasyNotes from "./easyComponents/EasyNotes";

export default function easyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full max-w-[1200px] mx-auto flex-1 flex flex-col bg-background">
        <NavigationBar />
        <PageTitle title="Easy Mode" backHref="/dashboard" />
        <EasyNotes />
      </div>
      <Footer />
    </div>
  );
}
