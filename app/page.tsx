import SiteNav from "@/components/site-nav";
import Hero from "@/components/hero";
import QuranBlock from "@/components/quran-block";
import Practices from "@/components/practices";
import Spotlight from "@/components/spotlight";
import ScreensStrip from "@/components/screens-strip";
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
        <Spotlight
          id="sakinah"
          label="A companion"
          title="Sakinah sits with you when the night feels long."
          body="A listening presence that answers gently — never preachy, always rooted in authentic sources. Whatever you're carrying, we can sit with it together for a while."
          screens={[
            { src: "/screens/sakinah.webp", alt: "Sakinah chat" },
          ]}
        />
        <Spotlight
          flip
          surface
          label="Audio refuge"
          title="Fall asleep to something soft."
          body="Gentle recitations and quiet reminders, built for the long hours. The moon breathes, the audio plays low, and we stay quiet beside you."
          screens={[
            { src: "/screens/sleep.webp", alt: "Sleep — the moon halo" },
            { src: "/screens/solace.webp", alt: "Solace audio player" },
          ]}
        />
        <Spotlight
          label="Daily anchors"
          title="The tongue remembers what the heart forgets."
          body="Morning and evening adhkar with full sahih references — and breathing patterns tied to the dhikr: Calm, Rest, Focus. Every exhale, a return."
          screens={[
            { src: "/screens/athkar.webp", alt: "Morning and evening adhkar" },
            { src: "/screens/breathe.webp", alt: "Sujud breathing orb" },
          ]}
        />
        <ScreensStrip />
        <Stats />
        <Memorial />
        <Download />
      </main>
      <Footer />
    </>
  );
}
