import "./site.css";
import Nav from "@/components/site/nav";
import Hero from "@/components/site/hero";
import HeartCheck from "@/components/site/heart-check";
import Sakinah from "@/components/site/sakinah";
import Breathe from "@/components/site/breathe";
import Athkar from "@/components/site/athkar";
import Stillness from "@/components/site/stillness";
import Paths from "@/components/site/paths";
import SpacePicker from "@/components/site/space-picker";
import WhatsNew from "@/components/site/whats-new";
import Gallery from "@/components/site/gallery";
import Film from "@/components/site/film";
import OurPromise from "@/components/site/promise";
import GetApp from "@/components/site/get-app";
import Footer from "@/components/footer";
import Reveals from "@/components/site/reveals";

const LINKS = [
  { href: "#sakinah", label: "Sakinah" },
  { href: "#breathe", label: "Practices" },
  { href: "#space", label: "Your Space" },
  { href: "#film", label: "Film" },
  { href: "/support", label: "Support" },
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
        <Stillness />
        <Paths />
        <SpacePicker />
        <WhatsNew />
        <Gallery />
        <Film />
        <OurPromise />
        <GetApp />
      </main>
      <Footer />
      <Reveals />
    </div>
  );
}
