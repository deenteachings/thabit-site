import SiteNav from "@/components/site-nav";
import Hero from "@/components/hero";
import Hadith from "@/components/hadith";
import Features from "@/components/features";
import Preview from "@/components/preview";
import Memorial from "@/components/memorial";
import Download from "@/components/download";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <Hero />
        <Hadith />
        <Features />
        <Preview />
        <Memorial />
        <Download />
      </main>
      <Footer />
    </>
  );
}
