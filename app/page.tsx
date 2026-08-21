import SiteNav from "@/components/site-nav";
import Hero from "@/components/hero";
import QuranBlock from "@/components/quran-block";
import Practices from "@/components/practices";
import Showcase from "@/components/showcase";
import Stats from "@/components/stats";
import Memorial from "@/components/memorial";
import Download from "@/components/download";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <Hero />
        <QuranBlock />
        <Practices />
        <Showcase />
        <Stats />
        <Memorial />
        <Download />
      </main>
      <Footer />
    </>
  );
}
