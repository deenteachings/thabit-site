import Link from "next/link";
import "./home.css";

export default function NotFound() {
  return (
    <main className="thabit-home flex min-h-screen flex-col items-center justify-center px-6 py-20 text-center">
      <p className="section-label">404 / A little off the path</p>
      <h1 className="display-large mt-6 max-w-xl">Let’s find your way back.</h1>
      <p className="mt-5 max-w-md text-sm leading-7 text-secondary">
        This page isn’t here. You can return to Thābit.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link className="btn-pill btn-solid" href="/">
          Back to Thābit
        </Link>
      </div>
    </main>
  );
}
