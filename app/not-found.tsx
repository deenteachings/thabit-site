import Link from "next/link";
import Footer from "@/components/footer";
import Nav from "@/components/site/nav";
import "./site.css";

export default function NotFound() {
  return (
    <div className="site">
      <Nav cta="/#download" links={[{ href: "/support", label: "Support" }]} />
      <main id="main" className="chapter field-paper not-found">
        <div className="wrap">
          <p className="micro">404 / A little off the path</p>
          <h1 className="display">
            Let’s find
            <span className="accent">your way back.</span>
          </h1>
          <p className="body-lg">This page isn’t here. You can return to Thābit.</p>
          <Link className="btn btn-ink not-found-cta" href="/">
            Back to Thābit
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
