import type { Metadata } from "next";
import "./site.css";
import Nav from "@/components/site/nav";
import Hero from "@/components/site/hero";
import HeartCheck from "@/components/site/heart-check";
import Sakinah from "@/components/site/sakinah";
import Breathe from "@/components/site/breathe";
import Athkar from "@/components/site/athkar";
import DuaTogether from "@/components/site/dua-together";
import Stillness from "@/components/site/stillness";
import Paths from "@/components/site/paths";
import SpacePicker from "@/components/site/space-picker";
import WhatsNew from "@/components/site/whats-new";
import Gallery from "@/components/site/gallery";
import Film from "@/components/site/film";
import Faq from "@/components/site/faq";
import OurPromise from "@/components/site/promise";
import GetApp from "@/components/site/get-app";
import Footer from "@/components/footer";
import Reveals from "@/components/site/reveals";
import StructuredData from "@/components/site/structured-data";
import TabBar, { type Tab } from "@/components/site/tab-bar";

const LINKS = [
  { href: "#sakinah", label: "Sakinah" },
  { href: "#breathe", label: "Practices" },
  { href: "#space", label: "Your Space" },
  { href: "#film", label: "Film" },
  { href: "/support", label: "Support" },
];

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// The phone tab bar: five places, lit by the section on screen.
const TABS: Tab[] = [
  { href: "#top", label: "Home", icon: "house@light", iconOn: "house", sections: ["top", "heart"] },
  { href: "#sakinah", label: "Sakinah", icon: "sparkle@light", iconOn: "sparkle", sections: ["sakinah"] },
  { href: "#breathe", label: "Practices", icon: "squares-four", iconOn: "squares-four@fill", sections: ["breathe", "athkar", "dua", "meditation", "paths"] },
  { href: "#space", label: "Space", icon: "palette@light", iconOn: "palette@fill", sections: ["space", "new", "screens"] },
  { href: "#film", label: "Film", icon: "play@light", iconOn: "play", sections: ["film", "faq", "promise", "download"] },
];

export default function Home() {
  return (
    <div className="site">
      <Nav links={LINKS} />
      <main id="main">
        <Hero />
        <HeartCheck />
        <Sakinah />
        <Breathe />
        <Athkar />
        <DuaTogether />
        <Stillness />
        <Paths />
        <SpacePicker />
        <WhatsNew />
        <Gallery />
        <Film />
        <Faq />
        <OurPromise />
        <GetApp />
      </main>
      <Footer />
      <TabBar tabs={TABS} />
      <Reveals />
      <StructuredData />
    </div>
  );
}
